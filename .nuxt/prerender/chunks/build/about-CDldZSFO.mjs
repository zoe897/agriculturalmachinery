import { defineComponent, ref, computed, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode } from 'file:///workspaces/agriculturalmachinery/node_modules/vue/server-renderer/index.mjs';
import { CheckCircle, Users, Settings, Truck, Globe, ShieldCheck, Factory } from 'file:///workspaces/agriculturalmachinery/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { u as useSeoMeta } from './index-DZ5-QLyc.mjs';
import 'file:///workspaces/agriculturalmachinery/node_modules/@unhead/shared/dist/index.mjs';
import './server.mjs';
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
import 'file:///workspaces/agriculturalmachinery/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  props: {
    aboutData: {
      type: Object,
      default: () => ({
        hero: {
          subtitle: "About Our Company",
          title: "Your Trusted Global Manufacturing Partner",
          description: "We are a leading manufacturer and exporter with over 15 years of experience. We specialize in providing high-quality OEM & ODM solutions for clients worldwide. Our commitment to innovation, strict quality control, and customer satisfaction has made us a preferred partner in the global market.",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop",
          highlights: [
            "15+ Years of Manufacturing Experience",
            "Comprehensive OEM/ODM Services",
            "ISO 9001 Certified Quality Control",
            "Global Supply Chain Network"
          ]
        },
        stats: [
          { value: "15+", label: "Years Experience" },
          { value: "50+", label: "Countries Exported" },
          { value: "10,000\u33A1", label: "Factory Area" },
          { value: "100%", label: "Quality Inspection" }
        ],
        features: {
          title: "Why Partner With Us?",
          description: "We don't just supply products; we provide complete solutions to help your business grow and stay competitive in the market.",
          list: [
            {
              icon: "Factory",
              title: "OEM & ODM Capability",
              description: "Strong R&D team and flexible production lines to meet your customized requirements perfectly."
            },
            {
              icon: "ShieldCheck",
              title: "Strict Quality Control",
              description: "From raw materials to final packaging, every step is strictly monitored to ensure zero defects."
            },
            {
              icon: "Globe",
              title: "Global Export Experience",
              description: "Familiar with international trade standards, certifications, and smooth customs clearance."
            },
            {
              icon: "Truck",
              title: "Fast & Reliable Delivery",
              description: "Optimized supply chain and strategic logistics partnerships ensure your goods arrive on time."
            },
            {
              icon: "Settings",
              title: "Advanced Technology",
              description: "Equipped with state-of-the-art machinery to guarantee precision, efficiency, and scale."
            },
            {
              icon: "Users",
              title: "24/7 Professional Support",
              description: "Our multilingual sales team is always ready to provide rapid responses and dedicated service."
            }
          ]
        }
      })
    }
  },
  setup(__props) {
    const iconMap = {
      Factory,
      ShieldCheck,
      Globe,
      Truck,
      Settings,
      Users
    };
    const props = __props;
    const siteConfig = ref({});
    const displayAbout = computed(() => {
      var _a;
      if ((_a = siteConfig.value) == null ? void 0 : _a.about) {
        return siteConfig.value.about;
      }
      return props.aboutData;
    });
    useSeoMeta({
      title: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.title) || "Default Title";
      },
      description: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.description) || "Default description";
      },
      ogTitle: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.title) || "Default Title";
      },
      ogDescription: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.description) || "Default description";
      },
      ogImage: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.ogImage) || "/default-og.jpg";
      },
      twitterCard: () => {
        var _a, _b;
        return ((_b = (_a = siteConfig.value) == null ? void 0 : _a.seo) == null ? void 0 : _b.about.twitterCard) || "summary_large_image";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page pt-24 pb-16 bg-white overflow-hidden" }, _attrs))}><section class="container mx-auto px-4 mb-24"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div class="content order-2 lg:order-1"><div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 tracking-wide border border-blue-100 uppercase">${ssrInterpolate(displayAbout.value.hero.subtitle)}</div><h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">${ssrInterpolate(displayAbout.value.hero.title)}</h1><p class="text-lg text-slate-600 mb-8 leading-relaxed">${ssrInterpolate(displayAbout.value.hero.description)}</p><ul class="space-y-4 mb-8"><!--[-->`);
      ssrRenderList(displayAbout.value.hero.highlights, (item, index) => {
        _push(`<li class="flex items-center text-slate-700 font-medium">`);
        _push(ssrRenderComponent(unref(CheckCircle), { class: "w-5 h-5 text-blue-500 mr-3 flex-shrink-0" }, null, _parent));
        _push(` ${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul></div><div class="relative order-1 lg:order-2"><div class="absolute -top-6 -right-6 w-full h-full bg-slate-100 rounded-3xl -z-10"></div><img${ssrRenderAttr("src", displayAbout.value.hero.image)}${ssrRenderAttr("alt", displayAbout.value.hero.title)} class="w-full h-[500px] object-cover rounded-3xl shadow-xl"></div></div></section><section class="bg-[#001151] py-16 mb-24"><div class="container mx-auto px-4"><div class="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/10 text-center"><!--[-->`);
      ssrRenderList(displayAbout.value.stats, (stat, index) => {
        _push(`<div class="px-4"><div class="text-4xl lg:text-5xl font-black text-white mb-2">${ssrInterpolate(stat.value)}</div><div class="text-blue-200 font-medium tracking-wide uppercase text-sm">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="container mx-auto px-4 mb-24"><div class="text-center max-w-3xl mx-auto mb-16"><h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">${ssrInterpolate(displayAbout.value.features.title)}</h2><p class="text-lg text-slate-600">${ssrInterpolate(displayAbout.value.features.description)}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(displayAbout.value.features.list, (feature, index) => {
        _push(`<div class="bg-slate-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group border border-slate-100"><div class="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(iconMap[feature.icon]), { class: "w-7 h-7" }, null), _parent);
        _push(`</div><h3 class="text-xl font-bold text-slate-900 mb-3">${ssrInterpolate(feature.title)}</h3><p class="text-slate-600 leading-relaxed">${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-CDldZSFO.mjs.map
