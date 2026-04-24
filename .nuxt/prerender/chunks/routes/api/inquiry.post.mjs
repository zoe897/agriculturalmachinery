import { defineEventHandler, readBody } from 'file:///workspaces/agriculturalmachinery/node_modules/h3/dist/index.mjs';
import { s as sendEmail, a as saveToSheet, g as generateWhatsAppLink } from '../../nitro/nitro.mjs';
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
import 'file:///workspaces/agriculturalmachinery/node_modules/ofetch/dist/node.mjs';
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

const inquiry_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const inquiry = {
    name: body.name,
    email: body.email,
    country: body.country,
    product: body.product,
    message: body.message,
    time: (/* @__PURE__ */ new Date()).toISOString()
  };
  await sendEmail(inquiry);
  await saveToSheet(inquiry);
  const whatsappLink = generateWhatsAppLink({
    phone: process.env.WHATSAPP_PHONE || "8619743003775/8613066010625",
    ...inquiry
  });
  return {
    success: true,
    whatsappLink
  };
});

export { inquiry_post as default };
//# sourceMappingURL=inquiry.post.mjs.map
