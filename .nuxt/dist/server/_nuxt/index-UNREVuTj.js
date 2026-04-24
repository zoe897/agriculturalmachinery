import { _ as __nuxt_component_0 } from "./nuxt-link-C1RIA-0C.js";
import { defineComponent, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { PackageOpen } from "lucide-vue-next";
import { u as useState } from "./state-_I5XcLqc.js";
import { u as useAsyncData, q as queryContent } from "./query-D5VriVSD.js";
import "ufo";
import "hookable";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ohash";
import "klona";
import "./preview-C9vdoeer.js";
import "cookie-es";
import "destr";
const useProductsNav = async () => {
  const productsNav = useState("products-nav", () => []);
  if (productsNav.value && productsNav.value.length > 0) {
    return { data: productsNav };
  }
  const { data } = await useAsyncData("products-navigation", async () => {
    try {
      const allProducts = await queryContent("products").find();
      const categoriesMap = /* @__PURE__ */ new Map();
      allProducts.forEach((product) => {
        if (product._path) {
          const parts = product._path.split("/").filter(Boolean);
          if (parts.length >= 2) {
            const categorySlug = parts[1];
            if (!categoriesMap.has(categorySlug)) {
              categoriesMap.set(categorySlug, {
                title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
                path: `/products/${categorySlug}`,
                children: []
              });
            }
          }
        }
      });
      return [{
        title: "Products",
        path: "/products",
        children: Array.from(categoriesMap.values())
      }];
    } catch (error) {
      console.error("Nav fetch error:", error);
      return [];
    }
  });
  productsNav.value = data.value || [];
  return { data: productsNav };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: navData } = ([__temp, __restore] = withAsyncContext(() => useProductsNav()), __temp = await __temp, __restore(), __temp);
    const categories = navData.value[0].children.map((item) => item.title);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-50 min-h-screen pt-24 pb-20" }, _attrs))}><div class="container mx-auto px-4"><nav class="mb-8 flex items-center gap-2 text-sm font-medium">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-slate-400 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-slate-300">/</span><span class="text-slate-900">Products</span></nav><div class="mb-12 border-l-4 border-blue-500 pl-6"><h1 class="text-4xl font-black text-slate-900 tracking-tight">Our Product Categories</h1><p class="text-slate-500 mt-2">Explore our wide range of high-quality products.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: category,
          to: `/products/${category}`,
          class: "group block bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 p-8 text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(PackageOpen), { class: "w-10 h-10 text-blue-600" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors capitalize"${_scopeId}>${ssrInterpolate(category)}</h3><p class="text-slate-500 text-sm"${_scopeId}>View all products in this category</p>`);
            } else {
              return [
                createVNode("div", { class: "w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-100 transition-colors" }, [
                  createVNode(unref(PackageOpen), { class: "w-10 h-10 text-blue-600" })
                ]),
                createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors capitalize" }, toDisplayString(category), 1),
                createVNode("p", { class: "text-slate-500 text-sm" }, "View all products in this category")
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-UNREVuTj.js.map
