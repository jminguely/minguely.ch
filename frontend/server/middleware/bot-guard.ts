/**
 * Server middleware that short-circuits common bot/scanner paths with a 404
 * before they reach the Vue router and generate noisy warnings.
 */
export default defineEventHandler((event) => {
  const path = event.node.req.url || ''

  // Quick check — skip assets and API routes handled by Nitro
  if (path.startsWith('/_nuxt/') || path.startsWith('/api/')) {
    return
  }

  // Common bot / scanner path patterns
  const botPatterns = [
    // WordPress
    /\/wp-(?:admin|login|content|includes|json)/i,
    /\/wordpress/i,
    /\/xmlrpc\.php/i,
    // PHP probes
    /\.php(?:\?|$)/i,
    // ASP / .NET probes
    /\.aspx?(?:\?|$)/i,
    // Environment / config leaks
    /\/\.env/i,
    /\/\.git/i,
    /\/\.DS_Store/i,
    /\/\.htaccess/i,
    /\/\.htpasswd/i,
    // Common CMS / admin scanners
    /\/admin(?:istrator)?(?:\/|$)/i,
    /\/phpmyadmin/i,
    /\/cgi-bin\//i,
    /\/vendor\//i,
    /\/node_modules\//i,
    // Login / credential probing
    /\/login(?:\.html)?$/i,
    /\/signin/i,
    /\/user\/login/i,
    // Common backdoor / shell paths
    /\/shell/i,
    /\/c99/i,
    /\/r57/i,
    /\/webshell/i,
    // Miscellaneous scanners
    /\/telescope\/requests/i,
    /\/debug\/default\/view/i,
    /\/console\//i,
    /\/solr\//i,
    /\/actuator/i,
    /\/_ignition/i,
    /\/owa\//i,
    /\/autodiscover/i,
    /\/ecp\//i,
    /\/remote\/fgt_lang/i,
    /\/boaform/i,
    /\/HNAP1/i,
    /\/sdk/i,
    /\/evox\//i,
  ]

  if (botPatterns.some((re) => re.test(path))) {
    setResponseStatus(event, 404)
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return 'Not Found'
  }
})
