const baseUrl = "http://xz.jvtc.jx.cn/JVTC_XG/";

const login = baseUrl + "UserLogin.html";
const init = baseUrl + "UserLogin.html";
const img_code = baseUrl + "default3.html";
const userinfo = baseUrl + "SystemForm/Class/MyStudent.aspx";
const StuActive = baseUrl + "SystemForm/StuActive/MyAction.aspx";
const AppAction = baseUrl + "SystemForm/StuActive/AppAction.aspx?Id=";
const WorkInfo = baseUrl + "SystemForm/WorkInfo.aspx";
const MyActionGetNum = baseUrl + "SystemForm/StuActive/MyActionGetNum.aspx";
const StuEnlightenRoomScore = baseUrl + "SystemForm/Gardens/StuEnlightenRoomScore.aspx";
// 老师相关
const TeacherInfo = baseUrl + "SystemForm/Personal/MyPerson.aspx";
const Navigation = baseUrl + "SystemForm/Navigation.aspx";
const TeacherReSetpass = baseUrl + "SystemForm/Class/TeacherReSetpass.aspx";

module.exports = {
  login,
  init,
  userinfo,
  StuActive,
  AppAction,
  WorkInfo,
  MyActionGetNum,
  StuEnlightenRoomScore,
  img_code,
  Navigation,
  // 老师相关
  TeacherInfo,
  TeacherReSetpass
}