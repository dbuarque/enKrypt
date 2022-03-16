const path = require("path");

const setConfig = (config) => {
  config.resolve.symlinks(false);
  config.module
    .rule("metaimport")
    .test(/packageInfo\.js$/)
    .use("webpack-import-loader")
    .loader("@open-wc/webpack-import-meta-loader")
    .end();
  //polkadot-js has import.meta with # //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta
  config.module
    .rule("private-fields-loader")
    .test(/\.js$/)
    .include.add((path) => path.match(/@polkadot/))
    .end()
    .use("private-fields-loader")
    .loader("./configs/private-fields-loader.js")
    .end(); //polkadot-js has private object fields that start with # //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
  config.resolve.alias.set(
    "@popup",
    path.resolve(__dirname, "../src/ui/action")
  );
};

exports.setConfig = setConfig;
