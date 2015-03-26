/*
 * 促销员模块
 */
var mysqlHelper = require('./mysqlHelper');

exports.addSaler = function (obj, handler) {
	 		 mysqlHelper.execQuery({
	 		 	 'sql': 'INSERT INTO `t_users_company` (`fCompanyID`, `fNumber`, `fName`, `fPassword`, `fPrivillege`, `fStatus`, `fType`, `fDepartment`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
	 		 	 'args':  [1, obj.strPhone, obj.strUserName, obj.strPassword, "", "启用", "推广员", "市场部"],
	 		 	 'handler': handler
	 		 });
};