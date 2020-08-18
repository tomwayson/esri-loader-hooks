import { loadModules } from 'esri-loader';

export function useIdentityManager(oAuthInfos: any) {
  loadModules([
    'esri/identity/OAuthInfo',
    'esri/identity/IdentityManager',
  ]).then(([OAuthInfo, esriId]) => {
    // https://developers.arcgis.com/javascript/latest/sample-code/identity-oauth-basic/index.html
    const infos = oAuthInfos.map((oAuthInfo: any) => {
      return new OAuthInfo(oAuthInfo);
    });
    esriId.registerOAuthInfos(infos);
  });
}
