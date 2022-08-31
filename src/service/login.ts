import axios from "axios";
import { CertLoginTypes, LoginTypes } from "./loginTypes";

const baseUrl = `https://htalk-api.helixtech.co.kr/auth/v1`;

export const getLoginApi = async (certNumreq: CertLoginTypes) => {
  try {
    const getCertNum = await axios.post(
      `${baseUrl}/cert/pw`,
      {
        certType: certNumreq.certType,
        email: certNumreq.email,
        password: certNumreq.password,
      },
      {
        headers: { "App-Agent": "AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB" },
      }
    );
  } catch (err) {
    console.error("Error:::", err);
    // window.location.reload(); =>리로드는 react에서 거의 쓰지 않는다/새로고침을 하면 app전체가 다시 불러와지는데 그걸 막기 위해서 react를쓰는건데 위배가 된다.
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
