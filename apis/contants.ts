const urls = {
  production: {
    backendUrl: "http://10.0.2.2:4000"
  },
  development: {
    backendUrl: "http://10.0.2.2:4000"
  },
};

const { production, development } = urls;
export const appUrls = true ? development : production;
