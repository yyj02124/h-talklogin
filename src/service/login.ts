import axios from "axios";
import { CertLoginTypes, LoginTypes } from "./loginTypes";

const baseUrl = `https://htalk-api.helixtech.co.kr/auth/v1`;

export const getLoginApi = async (certNumreq: CertLoginTypes) => {
  try {
    const getCertNum = await axios.post(`${baseUrl}/cert/pw`, certNumreq, {
      headers: { "App-Agent": "AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB" },
    });
  } catch (err) {
    console.error("Error:::", err);
    window.location.reload();
    window.alert(err);
  }
};

export const getHtalkApi = async (certIdreq: CertLoginTypes, userInformReq: LoginTypes) => {
  try {
    const getCertId = await axios.post(`${baseUrl}/cert/confirm/pw`, certIdreq, {
      headers: { "App-Agent": "AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB" },
    });

    const certId = getCertId.data.certId;

    const getUserInform = await axios.post(
      `${baseUrl}/login/pw`,
      {
        certId: `${certId}`,
        certType: userInformReq.certType,
        email: userInformReq.email,
        password: userInformReq.password,
      },
      {
        headers: { "App-Agent": "AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB" },
      }
    );
  } catch (err) {
    console.error("Error:::", err);
  }
};
