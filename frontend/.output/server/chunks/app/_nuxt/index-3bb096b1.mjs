import { withAsyncContext, unref, useSSRContext } from 'vue';
import { b as useRoute, u as useStrapiClient, a as useRuntimeConfig } from '../server.mjs';
import { print } from 'graphql';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'ufo';
import 'destr';
import 'cookie-es';
import 'ohash';
import 'qs';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const useStrapiGraphQL = () => {
  const client = useStrapiClient();
  const config = /* @__PURE__ */ useRuntimeConfig();
  return (query, variables) => {
    const queryAsString = typeof query === "string" ? query : print(query);
    return client("/graphql", {
      method: "POST",
      body: {
        query: queryAsString,
        variables
      },
      headers: {
        accept: "application/json"
      },
      baseURL: config.strapi.url
    });
  };
};
var doc = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "projects" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "data" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "attributes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "title" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "subtitle" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "description" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "external_url" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "cover" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "data" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "attributes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" }, "arguments": [], "directives": [] }] } }] } }] } }] } }] } }] } }] } }], "loc": { "start": 0, "end": 279 } };
doc.loc.source = { "body": "query {\n  projects {\n    data {\n      id\n      attributes {\n        title\n        subtitle\n        description\n        external_url\n        cover {\n          data {\n            id\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}\n", "name": "GraphQL request", "locationOffset": { "line": 1, "column": 1 } };
function collectFragmentReferences(node, refs) {
  if (node.kind === "FragmentSpread") {
    refs.add(node.name.value);
  } else if (node.kind === "VariableDefinition") {
    var type = node.type;
    if (type.kind === "NamedType") {
      refs.add(type.name.value);
    }
  }
  if (node.selectionSet) {
    node.selectionSet.selections.forEach(function(selection) {
      collectFragmentReferences(selection, refs);
    });
  }
  if (node.variableDefinitions) {
    node.variableDefinitions.forEach(function(def) {
      collectFragmentReferences(def, refs);
    });
  }
  if (node.definitions) {
    node.definitions.forEach(function(def) {
      collectFragmentReferences(def, refs);
    });
  }
}
var definitionRefs = {};
(function extractReferences() {
  doc.definitions.forEach(function(def) {
    if (def.name) {
      var refs = /* @__PURE__ */ new Set();
      collectFragmentReferences(def, refs);
      definitionRefs[def.name.value] = refs;
    }
  });
})();
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const graphql = useStrapiGraphQL();
    const { data } = ([__temp, __restore] = withAsyncContext(() => graphql(doc)), __temp = await __temp, __restore(), __temp);
    const {
      projects: { data: projects }
    } = data;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-3xl font-bold underline text-red-500">Hello world!</h1><p>Current route: ${ssrInterpolate(unref(route).path)}</p><h2 class="text-2xl">Projects</h2><!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(`<div><h2>${ssrInterpolate(project.attributes.title)}</h2><h2>${ssrInterpolate(project.attributes.subtitle)}</h2></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-3bb096b1.mjs.map
