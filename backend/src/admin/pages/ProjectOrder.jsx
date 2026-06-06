import React, { useState, useEffect, useRef } from "react";
import { useFetchClient } from "@strapi/helper-plugin";

const CATEGORIES = ["video", "music", "dev"];

const styles = {
  wrapper: { padding: "32px", maxWidth: "720px", fontFamily: "sans-serif" },
  heading: { fontSize: "22px", fontWeight: "600", marginBottom: "24px" },
  tabs: { display: "flex", gap: "8px", marginBottom: "24px" },
  tab: (active) => ({
    padding: "8px 20px",
    background: active ? "#4945ff" : "#f0f0ff",
    color: active ? "#fff" : "#4945ff",
    border: "1px solid #4945ff",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  }),
  list: {
    border: "1px solid #dcdce4",
    borderRadius: "4px",
    overflow: "hidden",
  },
  row: (dragging) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: dragging ? "#f0f0ff" : "#fff",
    borderBottom: "1px solid #eaeaef",
    cursor: "grab",
    userSelect: "none",
  }),
  handle: { color: "#b0b0c0", fontSize: "18px", lineHeight: 1 },
  index: {
    color: "#b0b0c0",
    fontSize: "12px",
    width: "20px",
    textAlign: "right",
  },
  title: { flex: 1, fontSize: "14px", fontWeight: "500" },
  subtitle: { color: "#8e8ea9", fontSize: "12px" },
  footer: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    alignItems: "center",
  },
  saveBtn: (saving) => ({
    padding: "10px 24px",
    background: saving ? "#a5a5ff" : "#4945ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: saving ? "default" : "pointer",
    fontWeight: "500",
    fontSize: "14px",
  }),
  status: { fontSize: "13px", color: "#27ae60" },
};

const ProjectOrder = () => {
  const { get, put } = useFetchClient();
  const [category, setCategory] = useState("video");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dragIdx = useRef(null);

  useEffect(() => {
    setLoading(true);
    setSaved(false);
    get("/api/projects", {
      params: {
        "filters[Category][$eq]": category,
        "sort[0]": "order:ASC",
        "sort[1]": "publishedAt:DESC",
        "pagination[limit]": 100,
        publicationState: "preview",
      },
    })
      .then(({ data }) => setProjects(data.data || []))
      .finally(() => setLoading(false));
  }, [category]);

  const onDragStart = (i) => {
    dragIdx.current = i;
  };

  const onDragOver = (e, targetIdx) => {
    e.preventDefault();
    const sourceIdx = dragIdx.current;
    if (targetIdx === sourceIdx) return;
    setProjects((prev) => {
      const next = [...prev];
      const [item] = next.splice(sourceIdx, 1);
      next.splice(targetIdx, 0, item);
      return next;
    });
    dragIdx.current = targetIdx;
  };

  const onDragEnd = () => {
    dragIdx.current = null;
  };

  const saveOrder = async () => {
    setSaving(true);
    setSaved(false);
    await Promise.all(
      projects.map((p, i) =>
        put(`/api/projects/${p.id}`, { data: { order: i + 1 } }),
      ),
    );
    setSaving(false);
    setSaved(true);
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Reorder Projects</h1>

      <div style={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={styles.tab(cat === category)}
            onClick={() => setCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#8e8ea9" }}>Loading…</p>
      ) : (
        <div style={styles.list}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDragEnd={onDragEnd}
              style={styles.row(dragIdx.current === i)}
            >
              <span style={styles.handle}>⠿</span>
              <span style={styles.index}>{i + 1}</span>
              <span style={styles.title}>{project.attributes.title}</span>
              <span style={styles.subtitle}>{project.attributes.subtitle}</span>
            </div>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <button
          style={styles.saveBtn(saving)}
          onClick={saveOrder}
          disabled={saving || loading}
        >
          {saving ? "Saving…" : "Save order"}
        </button>
        {saved && <span style={styles.status}>✓ Order saved</span>}
      </div>
    </div>
  );
};

export default ProjectOrder;
