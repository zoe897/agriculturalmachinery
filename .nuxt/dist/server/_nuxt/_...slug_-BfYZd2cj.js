import { resolveComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as useRoute } from "../server.mjs";
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
const _sfc_main = {
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = route.params.slug;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InquiryForm = resolveComponent("InquiryForm");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto py-10 px-6" }, _attrs))}><h1 class="text-3xl font-bold mb-6">${ssrInterpolate(unref(slug))}</h1><p class="text-gray-600 mb-10"> Contact us for price, specification and bulk order support. </p>`);
      _push(ssrRenderComponent(_component_InquiryForm, { product: unref(slug) }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_...slug_-BfYZd2cj.js.map
