import { resolveComponent, mergeProps, unref, useSSRContext } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/server-renderer/index.mjs';
import { a as useRoute } from './server.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/ofetch/dist/node.mjs';
import '../nitro/nitro.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/h3/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/ufo/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unified/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-parse/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-rehype/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-mdc/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/defu/dist/defu.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/remark-gfm/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-external-links/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-sort-attribute-values/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-sort-attributes/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/rehype-raw/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/detab/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/scule/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/micromark-util-sanitize-uri/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/hast-util-to-string/index.js';
import 'file:///workspaces/agriculturalmachinery/node_modules/github-slugger/index.js';
import 'google-spreadsheet';
import 'google-auth-library';
import 'file:///workspaces/agriculturalmachinery/node_modules/destr/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/hookable/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/node-mock-http/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/fs.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/nitropack/node_modules/ohash/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/klona/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unctx/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///workspaces/agriculturalmachinery/node_modules/pathe/dist/index.mjs';
import 'ipx';
import 'file:///workspaces/agriculturalmachinery/node_modules/@nuxt/image/node_modules/pathe/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/unhead/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/vue-router/vue-router.node.mjs';

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

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-BfYZd2cj.mjs.map
