export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    // 这将是 HTML 模板的对象表示。
    html.head.push(`<meta name="Nuxt Demo" content="Nuxt Demo" />`);
  });
  // 你也可以在这里拦截响应。
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    // todo 实现Mid鉴权
    // console.log(response);
  });
});
