import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center" }, _attrs))}><div class="text-center max-w-md"><h1 class="text-3xl font-bold mb-4"> Thank You! </h1><p class="mb-6 text-gray-600"> We will reply within 12 hours. </p><a href="https://wa.me/8619743003775/8613066010625" class="bg-green-600 text-white px-6 py-3 rounded inline-block"> Chat on WhatsApp Now </a></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/thank-you.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const thankYou = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  thankYou as default
};
//# sourceMappingURL=thank-you-BNT_6Y2B.js.map
