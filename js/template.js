define(function () {
    this['JST'] = this['JST'] || {};

    this['JST']['tpl/alert.message.html'] = '<% if (data.isClose) { %>  \n' +
        '<div class="alert alert-dismissable <%=data.type%>">\n' +
        '    <button type="button" class="close" data-dismiss="alert">×</button>\n' +
        '    <strong><%=data.message%></strong>\n' +
        '</div>\n' +
        '<% } else { %>\n' +
        '<div class="alert <%=data.type%>">\n' +
        '    <strong><%=data.message%></strong>\n' +
        '</div>\n' +
        '<% } %> ';

    this['JST']['tpl/empty.html'] = '<div class="empty-ctn">\n' +
        '    <img class="img-responsive" style="margin: 0 auto;" src="images/404.png">\n' +
        '    <p class="text-info"><%=data.message%></p>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.common.html'] = '<div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <label>您拥有的域名标识：</label>\n' +
        '                    <!-- <p class="form-control-static text-primary h4 "></p> -->\n' +
        '                    <div class="drop-ctn domain-sign">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">加载中...</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <!-- <a href="javascript:void(0)" class="btn btn-primary create"><span class="glyphicon glyphicon-plus"></span>新建</a> -->\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <hr style="margin-top:0">\n' +
        '    <div class="panel-ctn"></div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.domainbind.add.html'] = '<form class="form-horizontal"> \n' +
        '    <fieldset>\n' +
        '        <legend><%=data.domain%></legend>\n' +
        '        <div class="form-group">\n' +
        '            <div class="col-lg-12 info-ctn">\n' +
        '                <div class="alert alert-dismissable alert-info" style="margin-bottom:0;">\n' +
        '                    <button type="button" class="close" data-dismiss="alert">×</button>\n' +
        '                    <strong>提示：</strong>域名必须填写协议头，多个域名以英文逗号,隔开\n' +
        '                </div>\n' +
        '            </div> \n' +
        '        </div>\n' +
        '        <div class="form-group"> \n' +
        '            <label class="col-lg-12">需要绑定的域名：</label> \n' +
        '        </div> \n' +
        '        <div class="form-group"> \n' +
        '            <div class="col-lg-12"> \n' +
        '                <textarea class="form-control" rows="5"></textarea>\n' +
        '            </div> \n' +
        '        </div>\n' +
        '        <div class="form-group"> \n' +
        '            <div class="col-lg-12"> \n' +
        '                <p class="text-danger">*请输入正确的域名！</p>\n' +
        '            </div> \n' +
        '        </div>\n' +
        '    </fieldset> \n' +
        '</form>';

    this['JST']['tpl/globalSetup/globalSetup.domainbind.html'] = '<div class="domainbind-panel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <label>您拥有的域名标识：</label>\n' +
        '                    <!-- <p class="form-control-static text-primary h4 "></p> -->\n' +
        '                    <div class="drop-ctn domain-sign">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">加载中...</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <!-- <a href="javascript:void(0)" class="btn btn-primary create"><span class="glyphicon glyphicon-plus"></span>新建</a> -->\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 panel-group-ctn"></div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.domainbind.panel.html'] = '<div class="panel-group" id="global-domainbind" role="tablist">\n' +
        '    <div class="panel panel-default">\n' +
        '        <div class="panel-heading clearfix" role="tab" id="headingPushRTMP">\n' +
        '            <h4 class="panel-title" style="display: inline-block;">\n' +
        '                <a role="button" data-toggle="collapse" data-parent="#global-domainbind" href="#collapsePushRTMP">\n' +
        '                    RTMP推流域名：<span>加载中...</span>\n' +
        '                </a>\n' +
        '            </h4>\n' +
        '            <a href="javascript:void(0)" class="text-primary pull-right create" type="PUSH">\n' +
        '                <span class="glyphicon glyphicon-pushpin"></span>绑定域名\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div id="collapsePushRTMP" class="panel-collapse collapse in" role="tabpanel">\n' +
        '            <div class="panel-body">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="panel panel-default">\n' +
        '        <div class="panel-heading clearfix" role="tab" id="headingPullRTMP">\n' +
        '            <h4 class="panel-title" style="display: inline-block;">\n' +
        '                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#global-domainbind" href="#collapsePullRTMP">\n' +
        '                    RTMP拉流域名：<span>加载中...</span>\n' +
        '                </a>\n' +
        '            </h4>\n' +
        '            <a href="javascript:void(0)" class="text-primary pull-right create" type="PULL_CDN_RTMP">\n' +
        '                <span class="glyphicon glyphicon-pushpin"></span>绑定域名\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div id="collapsePullRTMP" class="panel-collapse collapse" role="tabpanel">\n' +
        '            <div class="panel-body">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="panel panel-default">\n' +
        '        <div class="panel-heading clearfix" role="tab" id="headingPullHLS">\n' +
        '            <h4 class="panel-title" style="display: inline-block;">\n' +
        '                <a class="collapsed" role="button" data-toggle="collapse" data-parent="#global-domainbind" href="#collapsePullHLS">\n' +
        '                    HLS拉流域名：<span>加载中...</span>\n' +
        '                </a>\n' +
        '            </h4>\n' +
        '            <a href="javascript:void(0)" class="text-primary pull-right create" type="PULL_CDN_HLS">\n' +
        '                <span class="glyphicon glyphicon-pushpin"></span>绑定域名\n' +
        '            </a>\n' +
        '        </div>\n' +
        '        <div id="collapsePullHLS" class="panel-collapse collapse" role="tabpanel">\n' +
        '            <div class="panel-body">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.domainbind.table.html'] = '<table class="table table-striped table-responsive">\n' +
        '    <thead>\n' +
        '      <tr>\n' +
        '<!--         <th>\n' +
        '          <div class="checkbox">\n' +
        '              <label>\n' +
        '                  <input type="checkbox">\n' +
        '                      <span class="checkbox-material">\n' +
        '                          <span class="check">\n' +
        '                      </span>\n' +
        '                  </span>\n' +
        '              </label>\n' +
        '          </div>\n' +
        '        </th> -->\n' +
        '        <th>域名</th>\n' +
        '        <th>状态</th>\n' +
        '        <th>创建时间</th>\n' +
        '        <th>最后修改时间</th>\n' +
        '        <th>操作</th>\n' +
        '      </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '    <% for(var i = 0; i < data.length; i++) { %>  \n' +
        '        <tr data-id="<%=data[i].attributes[\'id\']%>">\n' +
        '<!--           <th scope="row">\n' +
        '            <div class="checkbox">\n' +
        '                <label>\n' +
        '                    <input type="checkbox" id="<%=data[i].attributes[\'id\']%>">\n' +
        '                        <span class="checkbox-material">\n' +
        '                            <span class="check">\n' +
        '                        </span>\n' +
        '                    </span>\n' +
        '                </label>\n' +
        '            </div>\n' +
        '          </th> -->\n' +
        '          <td><%=data[i].attributes["userDomain"]%></td>\n' +
        '          <td><%=data[i].attributes["statusName"]%></td>\n' +
        '          <td><%=data[i].attributes["createTimeFormated"]%></td>\n' +
        '          <td><%=data[i].attributes["updateTimeFormated"]%></td>\n' +
        '          <td>\n' +
        '              <% if(data[i].attributes[\'status\'] !== 0) { %>  \n' +
        '                  <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="delete" title="删除">\n' +
        '                      <span class="glyphicon glyphicon-trash"></span>\n' +
        '                  </a>\n' +
        '              <% } %>\n' +
        '          </td>\n' +
        '        </tr>\n' +
        '    <% } %>  \n' +
        '    </tbody>\n' +
        '</table>\n' +
        '';

    this['JST']['tpl/globalSetup/globalSetup.home.create.html'] = '<form class="form-horizontal"> \n' +
        '    <fieldset>\n' +
        '        <div class="form-group">\n' +
        '            <div class="col-lg-12 info-ctn">\n' +
        '                <div class="alert alert-dismissable alert-info" style="margin-bottom:0;">\n' +
        '                    <button type="button" class="close" data-dismiss="alert">×</button>\n' +
        '                    <strong>提示：</strong>域名标识由字母和数字组成。（目前只支持单个域名，多个域名敬请期待）\n' +
        '                </div>\n' +
        '            </div> \n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <label for="inputSign" class="col-sm-2 control-label">域名标识</label>\n' +
        '            <div class="col-sm-10">\n' +
        '                <input type="text" class="form-control" id="inputSign" placeholder="">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group"> \n' +
        '            <div class="col-sm-offset-2 col-sm-10"> \n' +
        '                <p class="text-danger">*请输入正确的域名标识！</p>\n' +
        '            </div> \n' +
        '        </div>\n' +
        '    </fieldset> \n' +
        '</form>';

    this['JST']['tpl/globalSetup/globalSetup.home.html'] = '<div class="setup-pannel ksc-tab">\n' +
        '    <div class="row">\n' +
        '        <div class="col-sm-6 col-md-6">\n' +
        '            <h2 class="ksc-title-2">全局配置</h2>\n' +
        '        </div>\n' +
        '        <div class="col-sm-6 col-md-6 tr">\n' +
        '            <button type="button" class="btn btn-primary btn-lg create-sign">\n' +
        '                <span class="glyphicon glyphicon-plus"></span>新建域名标识\n' +
        '            </button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <!-- Nav tabs -->\n' +
        '    <div class="alert alert-dismissable alert-warning">\n' +
        '        <button type="button" class="close" data-dismiss="alert">×</button>\n' +
        '        <strong>注意：</strong>因为涉及到全局节点较多并考虑线上服务整体稳定性，目前配置生效时间为第二个工作日，实时生效版本敬请期待\n' +
        '    </div>\n' +
        '    <ul class="nav nav-tabs" role="tablist">\n' +
        '        <li class="active">\n' +
        '            <a data-target="#domain-bind" data-toggle="tab">域名绑定</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#publish-setup" data-toggle="tab">发布设置</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#live-watch-setup" data-toggle="tab">直播回看</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#live-screenshot-setup" data-toggle="tab">直播截图</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#security-setup" data-toggle="tab">安全设置</a>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '    <!-- Tab panes -->\n' +
        '    <div class="tab-content well">\n' +
        '        <div role="tabpanel" class="tab-pane fade in active" id="domain-bind"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="publish-setup"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="live-watch-setup"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="live-screenshot-setup"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="security-setup"></div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.livescreenshot.html'] = '<div class="livewatch-panel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <div class="alert alert-info alert-dismissible" role="alert">\n' +
        '                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '                <strong>提示：</strong>\n' +
        '                <p>1、可选择直播截图功能，如果开启请选择存储空间（Bucket），用来存储截图文件，通知URL为可选，如填写就会按照填写的URL地址通知截图生成成功；</p>\n' +
        '                <p>2、截图文件命名规则为：流名-时间戳，具体请参考<a href="http://v.ksyun.com/doc.html#/doc/livesdk.md" target="_blank">直播服务接口说明文档</a>；</p>\n' +
        '                <p>3、为了存储容量统计的准确性，存储空间建议只作为截图存放使用；</p>\n' +
        '                <p>4、目前暂只支持杭州地区（Region）。</p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-offset-1 col-md-11">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <label style="margin-right:5px;">是否开启截图：</label>\n' +
        '                    <div class="togglebutton drop-ctn">\n' +
        '                        <label>\n' +
        '                            <input type="checkbox" <% if (data.screenshot) { %>checked="true"<% } %>><span class="toggle"></span>\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <form class="form-horizontal open-ctn">\n' +
        '        <div class="form-group storage-position">\n' +
        '            <label class="col-sm-2 control-label">存储空间：</label>\n' +
        '            <div class="drop-ctn bucket-list">\n' +
        '                <div class="col-sm-10">\n' +
        '                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                    <span id="cur-value">加载中...</span>\n' +
        '                    <span class="caret"></span>\n' +
        '                    </button>\n' +
        '                    <ul class="dropdown-menu long-dropdown-menu"></ul>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <label for="notify-url" class="col-sm-2 control-label">通知URL：</label>\n' +
        '            <div class="col-sm-10">\n' +
        '                <input type="text" class="form-control" id="notify-url" placeholder="示例：chat.24xia.com/live/recordNotify.do" value="<%=data.notifyUrl%>">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <label for="interval-time" class="col-sm-2 control-label">间隔时间：</label>\n' +
        '            <div class="col-sm-10">\n' +
        '                <input type="text" class="form-control" id="interval-time" placeholder="单位：秒" value="<%=data.interval%>">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12" style="text-align:center">\n' +
        '            <a href="javascript:void(0)" class="btn btn-primary submit-screenshot">提交</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.livewatch.html'] = '<div class="livewatch-panel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <div class="alert alert-info alert-dismissible" role="alert">\n' +
        '                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '                <strong>提示：</strong>\n' +
        '                <p>1、可选择直播转点播功能，如果开启请选择存储空间（Bucket），用来存储生成的点播文件，通知URL为可选，如填写就会按照填写的URL地址通知点播文件生成成功；</p>\n' +
        '                <p>2、点播文件命名规则为：流名-vdoid，vdoid为控制台自动生成，如果使用api对接请参考<a href="http://v.ksyun.com/doc.html#/doc/livesdk.md" target="_blank">直播服务接口说明文档</a>；</p>\n' +
        '                <p>3、为了存储容量统计的准确性，存储空间建议只作为回看存放使用；</p>\n' +
        '                <p>4、如果使用HLS的转点播功能，请下载Flash跨域文件<a href="http://wendangimg.kssws.ks-cdn.com/kls/crossdomain.xml" target="_blank">crossdomain.xml</a>文件，上传到绑定空间的根目录，才能正常在直播收录中预览回看文件；</p>\n' +
        '                <p>5、目前暂只支持杭州地区（Region）。</p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-offset-1 col-md-11">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <label style="margin-right:5px;">是否开启转点播：</label>\n' +
        '                    <div class="togglebutton drop-ctn">\n' +
        '                        <label>\n' +
        '                            <input type="checkbox" <% if (data.vod) { %>checked="true"<% } %>><span class="toggle"></span>\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row open-ctn">\n' +
        '        <div class="col-md-offset-2 col-md-10">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <div class="checkbox">\n' +
        '                        <label>\n' +
        '                            <input type="checkbox" id="vodmp4" <% if (data.vodmp4) { %>checked="true"<% } %>>\n' +
        '                                <span class="checkbox-material">\n' +
        '                                    <span class="check"></span>\n' +
        '                                </span>\n' +
        '                                MP4\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="checkbox">\n' +
        '                        <label>\n' +
        '                            <input type="checkbox" id="vodhls" <% if (data.vodhls) { %>checked="true"<% } %>>\n' +
        '                                <span class="checkbox-material">\n' +
        '                                    <span class="check"></span>\n' +
        '                                </span>\n' +
        '                                HLS\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <form class="form-horizontal open-ctn">\n' +
        '        <div class="form-group storage-position">\n' +
        '            <label class="col-sm-2 control-label">存储空间：</label>\n' +
        '            <div class="drop-ctn bucket-list">\n' +
        '                <div class="col-sm-10">\n' +
        '                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                    <span id="cur-value">加载中...</span>\n' +
        '                    <span class="caret"></span>\n' +
        '                    </button>\n' +
        '                    <ul class="dropdown-menu long-dropdown-menu"></ul>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <label for="notify-url" class="col-sm-2 control-label">通知URL：</label>\n' +
        '            <div class="col-sm-10">\n' +
        '                <input type="text" class="form-control" id="notify-url" placeholder="示例：chat.24xia.com/live/recordNotify.do" value="<%=data.notifyUrl%>">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12" style="text-align:center">\n' +
        '            <a href="javascript:void(0)" class="btn btn-primary submit-vod">提交</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.publish.html'] = '<div class="publish-panel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group hls-delay">\n' +
        '                    <label>HLS延时：</label>\n' +
        '                    <div class="drop-ctn">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">加载中...</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group delayed-ctn">\n' +
        '                    <input type="text" class="form-control" id="delayed" placeholder="单位：秒">\n' +
        '                </div>\n' +
        '                <div class="form-group delayed-alert">\n' +
        '                    <div class="form-control-static alert alert-warning">此选项用来控制HLS切片播放长度，低延时为5秒；如果选择高延时，请填写延时时间，单位：秒，范围为6-20秒。</div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12"><label>发布节点：</label></div>\n' +
        '    </div>\n' +
        '    <div class="row default-node">\n' +
        '        <div class="col-md-offset-1 col-md-10">\n' +
        '            <div class="radio">\n' +
        '                <label for="typeRadios1">\n' +
        '                    <input type="radio" name="typeRadios" id="typeRadios1" value="0" <% if (data.publishSetup.publishType == 0) { %>checked="true"<% } %>>\n' +
        '                        <span class="circle"></span>\n' +
        '                        <span class="check"></span>\n' +
        '                        发布到最近节点(默认)\n' +
        '                </label>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row custom-node">\n' +
        '        <div class="col-md-offset-1 col-md-10">\n' +
        '            <div class="radio">\n' +
        '                <label for="typeRadios2">\n' +
        '                    <input type="radio" name="typeRadios" id="typeRadios2" value="1" <% if (data.publishSetup.publishType == 1) { %>checked="true"<% } %>>\n' +
        '                        <span class="circle"></span>\n' +
        '                        <span class="check"></span>\n' +
        '                        自定义发布节点\n' +
        '                </label>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row custom-node-detail">\n' +
        '        <div class="col-md-offset-2 col-md-10">\n' +
        '            <form class="form-inline">\n' +
        '                <% for(var i = 0; i < data.publishNodeList.length; i++) { %>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="checkbox">\n' +
        '                        <label>\n' +
        '                            <input type="checkbox" id="<%=data.publishNodeList[i][\'locationId\']%>" <% if (data.publishSetup.publishNode[data.publishNodeList[i][\'locationId\']]) { %>checked="true"<% } %>>\n' +
        '                                <span class="checkbox-material">\n' +
        '                                    <span class="check"></span>\n' +
        '                                </span>\n' +
        '                                <%=data.publishNodeList[i]["name"]%>\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <% } %> \n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12" style="text-align:center">\n' +
        '            <a href="javascript:void(0)" class="btn btn-primary submit-delayed">提交</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.security.antileech.html'] = '<form class="form-inline">\n' +
        '    <div class="form-group">\n' +
        '        <div class="radio">\n' +
        '            <label for="pullSecurity1">\n' +
        '                <input type="radio" name="pullSecurityRadios" id="pullSecurity1" value="0" <% if (data.enable == 1&&data.type == 0) { %>checked="true"<% } %>>\n' +
        '                    <span class="circle"></span>\n' +
        '                    <span class="check"></span>\n' +
        '                    白名单\n' +
        '            </label>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '        <div class="radio">\n' +
        '            <label for="pullSecurity2">\n' +
        '                <input type="radio" name="pullSecurityRadios" id="pullSecurity2" value="1" <% if (data.enable == 1&&data.type == 1) { %>checked="true"<% } %>>\n' +
        '                    <span class="circle"></span>\n' +
        '                    <span class="check"></span>\n' +
        '                    黑名单\n' +
        '            </label>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '        <div class="radio">\n' +
        '            <label for="pullSecurity3">\n' +
        '                <input type="radio" name="pullSecurityRadios" id="pullSecurity3" value="0" <% if (data.enable == 0) { %>checked="true"<% } %>>\n' +
        '                    <span class="circle"></span>\n' +
        '                    <span class="check"></span>\n' +
        '                    关闭\n' +
        '            </label>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</form>\n' +
        '<div class="alert alert-warning alert-dismissible" role="alert">\n' +
        '    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '    <p>请输入您允许访问的来源域名，编辑域名时注意以下规则：</p>\n' +
        '    <p>1、域名之间请用逗号(,)分开，不需要写http://</p>\n' +
        '    <p>2、支持域名前使用通配符*：-前缀通配符：*.example.com 可用于指代所有example.com下的多级子域名（包含.example.com）,比如a.example.com等。</p>\n' +
        '</div>\n' +
        '<label class="antileech-title"><% if (data.type == 0) { %>白<% } else { %>黑<% } %>名单列表</label>\n' +
        '<textarea class="form-control" rows="5"><%= data.urls %></textarea>\n' +
        '<form class="form-inline" style="margin-top:20px;">\n' +
        '    <div class="form-group">\n' +
        '        <label>空Referer：</label>\n' +
        '        <div class="radio">\n' +
        '            <label for="pullReferer1">\n' +
        '                <input type="radio" name="pullRefererRadios" id="pullReferer1" value="1" <% if (data.allow_null_referer == 1) { %>checked="true"<% } %>>\n' +
        '                    <span class="circle"></span>\n' +
        '                    <span class="check"></span>\n' +
        '                    允许Referer为空\n' +
        '            </label>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '        <div class="radio">\n' +
        '            <label for="pullReferer2">\n' +
        '                <input type="radio" name="pullRefererRadios" id="pullReferer2" value="0" <% if (data.allow_null_referer == 0) { %>checked="true"<% } %>>\n' +
        '                    <span class="circle"></span>\n' +
        '                    <span class="check"></span>\n' +
        '                    不允许Referer为空\n' +
        '            </label>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</form>';

    this['JST']['tpl/globalSetup/globalSetup.security.html'] = '<div class="security-panel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <div class="panel-group" id="accordion" role="tablist">\n' +
        '                <div class="panel panel-default">\n' +
        '                    <div class="panel-heading" role="tab" id="headingOne">\n' +
        '                        <h4 class="panel-title">\n' +
        '                            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">\n' +
        '                                鉴权\n' +
        '                            </a>\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel">\n' +
        '                        <div class="panel-body">\n' +
        '                            <div class="alert alert-warning alert-dismissible" role="alert">\n' +
        '                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '                                <strong>注意：</strong>\n' +
        '                                <p>此功能主要设置推流时是否开启鉴权，打开时推流会携带鉴权信息，默认鉴权的过期时间为 3600 秒，可在新建直播时根据需要自行修改鉴权的过期时间。</p>\n' +
        '                            </div>\n' +
        '                            <form class="form-inline">\n' +
        '                                <div class="form-group acl-ctn">\n' +
        '                                    <label style="margin-right:5px;">是否开启鉴权：</label>\n' +
        '                                    <div class="togglebutton drop-ctn">\n' +
        '                                        <label>\n' +
        '                                            <input type="checkbox"><span class="toggle"></span>\n' +
        '                                        </label>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </form>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="panel panel-default">\n' +
        '                    <div class="panel-heading" role="tab" id="headingTwo">\n' +
        '                        <h4 class="panel-title">\n' +
        '                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">\n' +
        '                                防盗链\n' +
        '                            </a>\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel">\n' +
        '                        <div class="panel-body">\n' +
        '                            <form class="form-inline">\n' +
        '                                <div class="form-group antileech-bucket">\n' +
        '                                    <label>Bucket：</label>\n' +
        '                                    <div class="drop-ctn">\n' +
        '                                        <div class="btn-group">\n' +
        '                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                            <span id="cur-value">加载中...</span>\n' +
        '                                            <span class="caret"></span>\n' +
        '                                            </button>\n' +
        '                                            <ul class="dropdown-menu long-dropdown-menu"></ul>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </form>\n' +
        '                            <div class="antileech-ctn"></div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12" style="text-align:center">\n' +
        '            <a href="javascript:void(0)" class="btn btn-primary submit-security">提交</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/globalSetup/globalSetup.security.push.html'] = '<div class="panel panel-default">\n' +
        '    <div class="panel-heading" role="tab" id="headingOne">\n' +
        '        <h4 class="panel-title">\n' +
        '            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">\n' +
        '                推流黑白名单\n' +
        '            </a>\n' +
        '        </h4>\n' +
        '    </div>\n' +
        '    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel">\n' +
        '        <div class="panel-body">\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <div class="radio">\n' +
        '                        <label for="pushSecurity1">\n' +
        '                            <input type="radio" name="pushSecurityRadio" id="pushSecurity1" value="1" checked="true">\n' +
        '                                <span class="circle"></span>\n' +
        '                                <span class="check"></span>\n' +
        '                                白名单\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="radio">\n' +
        '                        <label for="pushSecurity2">\n' +
        '                            <input type="radio" name="pushSecurityRadio" id="pushSecurity2" value="2">\n' +
        '                                <span class="circle"></span>\n' +
        '                                <span class="check"></span>\n' +
        '                                黑名单\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="radio">\n' +
        '                        <label for="pushSecurity3">\n' +
        '                            <input type="radio" name="pushSecurityRadio" id="pushSecurity3" value="3">\n' +
        '                                <span class="circle"></span>\n' +
        '                                <span class="check"></span>\n' +
        '                                关闭\n' +
        '                        </label>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '            <div class="alert alert-warning alert-dismissible" role="alert">\n' +
        '                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '                <p>请输入您允许访问的IP地址，多个地址之间用逗号(,)分开，并检查所填IP是否正确。</p>\n' +
        '                <p>请输入您要拦截的IP地址，多个地址之间用逗号(,)分开，并检查所填IP是否正确。</p>\n' +
        '            </div>\n' +
        '            <p>白名单列表</p>\n' +
        '            <textarea class="form-control" rows="5"></textarea>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/home/home.html'] = '<div class="home-pannel">\n' +
        '    <div class="row">\n' +
        '        <div class="col-sm-6 col-md-6">\n' +
        '            <h2 class="ksc-title-2">直播概览</h2>\n' +
        '        </div>\n' +
        '        <div class="col-sm-6 col-md-6 tr">\n' +
        '            <button type="button" class="btn btn-primary btn-lg refresh">\n' +
        '                <span class="glyphicon glyphicon-refresh"></span>刷新\n' +
        '            </button>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-sm-12 col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <div class="well">\n' +
        '        <div class="row">\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <form class="form-inline">\n' +
        '                    <div class="form-group">\n' +
        '                        <span class="h4">计费类型: </span>\n' +
        '                        <span class="text-primary h4">带宽/月</span>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <form class="form-inline">\n' +
        '                    <div class="form-group">\n' +
        '                        <span class="h4">服务状态: </span>\n' +
        '                        <span class="text-success h4">正常</span>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="well running-status">\n' +
        '        <div class="ksc-subtitle-1">\n' +
        '            <h4 class="summary">运行概况</h4>\n' +
        '            <div class="description h5"><small>统计数据供参考，实际费用以帐单为准</small></div>\n' +
        '        </div>\n' +
        '        <div class="running-data"></div>\n' +
        '    </div>\n' +
        '    <div class="well bandwidth-status">\n' +
        '        <div class="row">\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <span>30日上传带宽峰值：</span>\n' +
        '                <span class="bandwidth-upload text-info">加载中...</span>\n' +
        '            </div>\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <span>30日下载带宽峰值：</span>\n' +
        '                <span class="bandwidth-download text-info">加载中...</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row">\n' +
        '            <div class="col-sm-12 col-md-12 echart-ctn"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="well person-status">\n' +
        '        <div class="row" style="display:none">\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <span>30日平均并发人数：</span>\n' +
        '                <span class="average text-info">加载中...</span>\n' +
        '            </div>\n' +
        '            <div class="col-sm-4 col-md-4">\n' +
        '                <span>30日并发峰值人数：</span>\n' +
        '                <span class="max text-info">加载中...</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row">\n' +
        '            <div class="col-sm-12 col-md-12 echart-ctn"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/home/home.info.html'] = '<form class="form-horizontal">\n' +
        '    <div class="form-group">\n' +
        '        <div class="col-sm-6">当前观看人数：<span class="text-warning"><%=data.onlinePersionCount%></span></div>\n' +
        '    </div>\n' +
        '    <div class="form-group">\n' +
        '        <div class="col-sm-6">\n' +
        '            <span>已有直播数：</span>\n' +
        '            <span class="text-primary"><%=data.liveCount%></span>\n' +
        '            <span>正在直播数：</span>\n' +
        '            <span class="text-primary"><%=data.onlineLiveCount%></span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <% for(var i = 0; i < data.storeKeys.length; i++) { %>\n' +
        '    <div class="form-group">\n' +
        '        <div class="col-sm-6">\n' +
        '            <span class="text-primary"><%=data.storeKeys[i]%></span>\n' +
        '            <span>存储占用空间：</span>\n' +
        '            <span class="text-primary"><%=data.store[data.storeKeys[i]]%></span>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <% } %> \n' +
        '</form>';

    this['JST']['tpl/images.html'] = '<div id="jquery-overlay"></div>\n' +
        '<div id="jquery-lightbox">\n' +
        '    <div id="lightbox-container-image-box">\n' +
        '        <div id="lightbox-container-image">\n' +
        '            <img src="" id="lightbox-image">\n' +
        '            <div id="lightbox-nav">\n' +
        '                <a href="javascript:void(0)" id="lightbox-nav-btnPrev" title="点击查看上一张">\n' +
        '                    <span class="glyphicon glyphicon-chevron-left"></span>\n' +
        '                </a>\n' +
        '                <a href="javascript:void(0)" id="lightbox-nav-btnNext" title="点击查看下一张">\n' +
        '                    <span class="glyphicon glyphicon-chevron-right"></span>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '            <div id="lightbox-loading">\n' +
        '                <a href="#" id="lightbox-loading-link">\n' +
        '                    <div class="spinner">\n' +
        '                        <div class="rect1"></div>\n' +
        '                        <div class="rect2"></div>\n' +
        '                        <div class="rect3"></div>\n' +
        '                        <div class="rect4"></div>\n' +
        '                        <div class="rect5"></div>\n' +
        '                    </div>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div id="lightbox-container-image-data-box">\n' +
        '        <div id="lightbox-container-image-data">\n' +
        '            <div id="lightbox-image-details">\n' +
        '                <span id="lightbox-image-details-caption"></span>\n' +
        '                <span id="lightbox-image-details-currentNumber"></span>\n' +
        '            </div>\n' +
        '            <div id="lightbox-secNav">\n' +
        '                <a href="#" id="lightbox-secNav-btnClose">\n' +
        '                    <span class="glyphicon glyphicon-remove"></span>\n' +
        '                </a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '';

    this['JST']['tpl/liveManage/liveManage.address.table.html'] = '<div class="table-responsive">\n' +
        '<table class="table table-striped" style="margin-bottom:0px">   \n' +
        '    <thead>\n' +
        '        <tr>\n' +
        '            <th style="min-width:100px">推流地址</th>\n' +
        '            <th></th>\n' +
        '            <th></th>\n' +
        '        </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '        <% for(var i = 0; i < data.pushURLs.length; i++) { %> \n' +
        '        <tr>\n' +
        '            <td style="min-width:100px">\n' +
        '                <a href="javascript:void(0)" url="<%=data.pushURLs[i]%>" liveid="<%=data.liveId%>" class="push">\n' +
        '                    <span class="glyphicon glyphicon-facetime-video"></span>推流\n' +
        '                </a>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <a href="javascript:void(0)" url="<%=data.pushURLs[i]%>" class="qrcode">\n' +
        '                    <span class="glyphicon glyphicon-qrcode"></span>\n' +
        '                </a>\n' +
        '            </td>\n' +
        '            <td><%=data.pushURLs[i]%></td>\n' +
        '        </tr>\n' +
        '        <% } %> \n' +
        '        <tr>\n' +
        '            <th style="min-width:100px">拉流地址</th>\n' +
        '            <th></th>\n' +
        '            <th></th>\n' +
        '        </tr>\n' +
        '        <% for(var i = 0; i < data.pullURLs.length; i++) { %> \n' +
        '        <tr>\n' +
        '            <td style="min-width:100px">\n' +
        '                <a href="javascript:void(0)" url="<%=data.pullURLs[i]%>" class="play">\n' +
        '                    <span class="glyphicon glyphicon-play-circle"></span>播放\n' +
        '                </a>\n' +
        '            </td>\n' +
        '            <td>\n' +
        '                <a href="javascript:void(0)" url="<%=data.pullURLs[i]%>" class="qrcode">\n' +
        '                    <span class="glyphicon glyphicon-qrcode"></span>\n' +
        '                </a>\n' +
        '            </td>\n' +
        '            <td><%=data.pullURLs[i]%></td>\n' +
        '        </tr>\n' +
        '        <% } %> \n' +
        '    </tbody>\n' +
        '</table>\n' +
        '</div>';

    this['JST']['tpl/liveManage/liveManage.create.camera.html'] = '<div class="local-camera-ctn tc">\n' +
        '    <div id="myContent">\n' +
        '        <img class="img-responsive" style="margin: 0 auto;height: 225px;" src="images/creat_guide_bg.png">\n' +
        '        <p class="text-info">生成推流地址后，点击\n' +
        '            <a href="javascript:void(0)" class="label label-primary pushBtn2 separator">\n' +
        '                <span class="glyphicon glyphicon-facetime-video"></span>推流\n' +
        '            </a>开始本地摄像头直播\n' +
        '        </p>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/liveManage/liveManage.create.html'] = '<div class="livemanage-create-panel ksc-tab">\n' +
        '    <h2 class="ksc-title-2" style="display: none">直播管理<small>/新建直播</small></h2>\n' +
        '    <div class="error-ctn"></div>\n' +
        '    <div class="well">\n' +
        '        <div class="row">\n' +
        '            <div class="col-md-12">\n' +
        '                <div class="alert alert-warning alert-dismissible" role="alert">\n' +
        '                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
        '                    <strong>直播提示：</strong>\n' +
        '                    直播严禁上传包括反动、暴力、色情、违法、及侵权内容的文件。金山云有义务配合有关部门将上传违规文件的用户信息保存，并保留因配合调查及冻结账号的权利。\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row create-live-ctn">\n' +
        '            <div class="col-md-12">\n' +
        '                <form class="form-inline">\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="live-id">直播名称</label>\n' +
        '                        <input type="text" class="form-control create-input" id="live-name">\n' +
        '                    </div>\n' +
        '                    <div class="form-group expire-ctn" style="display:none">\n' +
        '                        <label for="live-id">过期时间</label>\n' +
        '                        <input type="text" class="form-control create-input" id="live-exprie" placeholder="单位：秒">\n' +
        '                    </div>\n' +
        '<!--                     <div class="form-group live-acl">\n' +
        '                        <div class="checkbox">\n' +
        '                            <label>\n' +
        '                                <input type="checkbox">\n' +
        '                                    <span class="checkbox-material">\n' +
        '                                        <span class="check"></span>\n' +
        '                                    </span>\n' +
        '                                    鉴权\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                    </div> -->\n' +
        '                    <a href="javascript:void(0)" class="btn btn-success create-address">保存并生成直播推拉流地址</a>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-5">\n' +
        '            <ul class="nav nav-tabs" role="tablist">\n' +
        '                <li class="active">\n' +
        '                    <a data-target="#local-camera" data-toggle="tab" class="local-camera-tab">本地摄像头</a>\n' +
        '                </li>\n' +
        '                <li>\n' +
        '                    <a data-target="#mobile-upload" data-toggle="tab">手机上传</a>\n' +
        '                </li>\n' +
        '                <li>\n' +
        '                    <a data-target="#pc-tools" data-toggle="tab">PC端工具</a>\n' +
        '                </li>\n' +
        '            </ul>\n' +
        '            <!-- Tab panes -->\n' +
        '            <div class="tab-content well" style="min-height:300px;">\n' +
        '                <div role="tabpanel" class="tab-pane fade in active" id="local-camera"></div>\n' +
        '                <div role="tabpanel" class="tab-pane fade" id="mobile-upload"></div>\n' +
        '                <div role="tabpanel" class="tab-pane fade" id="pc-tools"></div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-md-7">\n' +
        '            <div class="well">\n' +
        '                <div class="player-ctn tc" id="ckplayer-ctn">\n' +
        '                    \n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="well table-address bounceInDown animated">\n' +
        '        <div class="row">\n' +
        '            <div class="col-md-12 table-address-ctn"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 tc">\n' +
        '            <a href="javascript:void(0)" class="btn btn-primary cancel">返回直播管理</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/liveManage/liveManage.home.html'] = '<div class="livemanage-pannel">\n' +
        '    <h2 class="ksc-title-2">直播管理</h2>\n' +
        '    <div class="error-ctn"></div>\n' +
        '    <div class="well opt-ctn">\n' +
        '        <div class="row query-ctn">\n' +
        '            <div class="col-md-12">\n' +
        '                <form class="form-inline">\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="live-id">直播ID</label>\n' +
        '                        <input type="text" class="form-control query-input" id="live-id">\n' +
        '                    </div>\n' +
        '                    <div class="form-group">\n' +
        '                        <label for="live-name">直播名称</label>\n' +
        '                        <input type="text" class="form-control query-input" id="live-name">\n' +
        '                    </div>\n' +
        '                    <div class="form-group live-status">\n' +
        '                        <label>直播状态</label>\n' +
        '                        <div class="drop-ctn">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">全部</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '<!--                     <div class="form-group live-record">\n' +
        '                        <label>直播收录</label>\n' +
        '                        <div class="drop-ctn">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">全部</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div> -->\n' +
        '                    <a href="javascript:void(0)" class="btn btn-primary query"><span class="glyphicon glyphicon-search"></span>查询</a>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="row">\n' +
        '            <div class="col-md-11 operation">\n' +
        '                <a href="javascript:void(0)" class="btn btn-primary create"><span class="glyphicon glyphicon-plus"></span>新建直播</a>\n' +
        '                <a href="javascript:void(0)" class="btn btn-success enable"><span class="glyphicon glyphicon-play-circle"></span>批量开始</a>\n' +
        '                <a href="javascript:void(0)" class="btn btn-warning disable"><span class="glyphicon glyphicon-off"></span>批量结束</a>\n' +
        '                <a href="javascript:void(0)" class="btn btn-danger m-delete"><span class="glyphicon glyphicon-trash"></span>批量删除</a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="well">\n' +
        '        <div class="table-ctn table-responsive"></div>\n' +
        '        <div class="page-ctn row">\n' +
        '            <div class="col-md-8" style="text-align:center">\n' +
        '                <div class="pagination"></div>\n' +
        '            </div>\n' +
        '            <div class="col-md-4" style="text-align:center">\n' +
        '                <form class="form-inline page-info">\n' +
        '                    <div class="form-group">\n' +
        '                        <p class="form-control-static">每页显示</p>\n' +
        '                        <div class="drop-ctn dropup">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">10 条</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="form-group">\n' +
        '                        <div class="form-control-static total-items">共<span class="text-primary">0</span>条记录</div>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '</div>';

    this['JST']['tpl/liveManage/liveManage.home.table.html'] = '<table class="table table-striped">\n' +
        '    <thead>\n' +
        '      <tr>\n' +
        '        <th>\n' +
        '          <div class="checkbox">\n' +
        '              <label>\n' +
        '                  <input type="checkbox">\n' +
        '                      <span class="checkbox-material">\n' +
        '                          <span class="check">\n' +
        '                      </span>\n' +
        '                  </span>\n' +
        '              </label>\n' +
        '          </div>\n' +
        '        </th>\n' +
        '        <th>直播ID</th>\n' +
        '        <th>直播名称</th>\n' +
        '        <th>直播收录</th>\n' +
        '        <th>状态</th>\n' +
        '        <th>操作</th>\n' +
        '      </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '    <% for(var i = 0; i < data.length; i++) { %>  \n' +
        '        <tr data-id="<%=data[i].attributes[\'id\']%>">\n' +
        '          <th scope="row">\n' +
        '            <div class="checkbox">\n' +
        '                <label>\n' +
        '                    <input type="checkbox" id="<%=data[i].attributes[\'id\']%>">\n' +
        '                        <span class="checkbox-material">\n' +
        '                            <span class="check">\n' +
        '                        </span>\n' +
        '                    </span>\n' +
        '                </label>\n' +
        '            </div>\n' +
        '          </th>\n' +
        '          <td><%=data[i].attributes["liveId"]%></td>\n' +
        '          <td><%=data[i].attributes["liveName"]%></td>\n' +
        '          <td><%=data[i].attributes["recoder"]%></td>\n' +
        '          <td><%=data[i].attributes["statusName"]%></td>\n' +
        '          <td>\n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="edit" title="编辑">\n' +
        '                  <span class="glyphicon glyphicon-edit"></span>\n' +
        '              </a>\n' +
        '              <% if (data[i].attributes["state"] !== "LIVE" && data[i].attributes["state"] !== "NOSTART") { %>  \n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="play" title="开始">\n' +
        '                  <span class="glyphicon glyphicon-play-circle"></span>\n' +
        '              </a>\n' +
        '              <% } %>\n' +
        '              <% if (data[i].attributes["state"] !== "STOP") { %>    \n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="stop" title="结束">\n' +
        '                  <span class="glyphicon glyphicon-off"></span>\n' +
        '              </a>\n' +
        '              <% } %>\n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="delete" title="删除">\n' +
        '                  <span class="glyphicon glyphicon-trash"></span>\n' +
        '              </a>\n' +
        '          </td>\n' +
        '        </tr>\n' +
        '    <% } %>  \n' +
        '    </tbody>\n' +
        '</table>\n' +
        '';

    this['JST']['tpl/liveManage/liveManage.mobileupload.html'] = '<div class="mobile-upload-panel">\n' +
        '<!--     <form class="form-inline">\n' +
        '        <div class="form-group">\n' +
        '            <label for="mobile-live-code">手机直播接入码：</label>\n' +
        '            <p class="form-control-static text-primary">AT97S89</p>\n' +
        '        </div>\n' +
        '    </form> -->\n' +
        '    <p>扫码下载金山直播工具：</p>\n' +
        '    <div class="row">\n' +
        '        <div class="col-xs-6 col-sm-6 col-md-6 tc" style="display:none">\n' +
        '            <div class="img-thumbnail ios-code"></div>\n' +
        '            <p>iOS（敬请期待）</p>\n' +
        '        </div>\n' +
        '        <div class="col-xs-6 col-sm-6 col-md-6 tc">\n' +
        '            <div class="img-thumbnail android-code"></div>\n' +
        '            <p>Android</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/liveManage/liveManage.pctool.html'] = '<div class="pc-tool-panel">\n' +
        '<!--     <form class="form-inline">\n' +
        '        <div class="form-group">\n' +
        '            <label for="mobile-live-code">rtmp地址 :</label>\n' +
        '            <p class="form-control-static text-primary">rtmp://live.ksyun.com/watch/8lnqh3</p>\n' +
        '        </div>\n' +
        '    </form> -->\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12">\n' +
        '            <table class="table table-striped table-responsive">\n' +
        '                <caption>推荐使用 H.264/AAC 编码直播配置：</caption>\n' +
        '                <tbody>\n' +
        '                    <tr>\n' +
        '                      <td>OBS推流软件下载：</td>\n' +
        '                      <td><a href="http://obsproject.com/download" target="_blank">Windows</a></td>\n' +
        '                      <td><a href="http://obsproject.com/download" target="_blank">Mac</a></td>\n' +
        '                      <td><a href="http://wendangimg.kssws.ks-cdn.com/tuiliugongjushiyongshuoming/OBS%E8%BD%AF%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8Ehtml.html" target="_blank">使用说明</a></td>\n' +
        '                    </tr>\n' +
        '<!--                     <tr>\n' +
        '                      <td>Xsplit推流软件下载：</td>\n' +
        '                      <td><a href="https://www.xsplit.com/download" target="_blank">Windows</a></td>\n' +
        '                      <td><a href="#"></a></td>\n' +
        '                      <td><a href="http://wendangimg.kssws.ks-cdn.com/tuiliugongjushiyongshuoming/Xsplit%E8%BD%AF%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.html" target="_blank">使用说明</a></td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                      <td>FMLE推流软件下载：</td>\n' +
        '                      <td><a href="http://www.adobe.com/go/fmle32_win" target="_blank">Windows</a></td>\n' +
        '                      <td><a href="http://www.adobe.com/go/fmle32_mac" target="_blank">Mac</a></td>\n' +
        '                      <td><a href="http://wendangimg.kssws.ks-cdn.com/tuiliugongjushiyongshuoming/FMLE%E8%BD%AF%E4%BB%B6%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.html" target="_blank">使用说明</a></td>\n' +
        '                    </tr> -->\n' +
        '                </tbody>\n' +
        '            </table>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/liveRecord/liveRecord.home.html'] = '<div class="liverecord-panel ksc-tab">\n' +
        '    <h2 class="ksc-title-2">直播收录</h2>\n' +
        '    <!-- Nav tabs -->\n' +
        '    <ul class="nav nav-tabs" role="tablist">\n' +
        '        <li class="active">\n' +
        '            <a data-target="#live-watch" data-toggle="tab">直播回看</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#live-screenshot" data-toggle="tab">直播截图</a>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '    <!-- Tab panes -->\n' +
        '    <div class="tab-content well">\n' +
        '        <div role="tabpanel" class="tab-pane fade in active" id="live-watch"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="live-screenshot"></div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/liveRecord/liveRecord.home.table.html'] = '<table class="table table-striped">\n' +
        '    <thead>\n' +
        '      <tr>\n' +
        '        <th>\n' +
        '          <div class="checkbox">\n' +
        '              <label>\n' +
        '                  <input type="checkbox">\n' +
        '                      <span class="checkbox-material">\n' +
        '                          <span class="check">\n' +
        '                      </span>\n' +
        '                  </span>\n' +
        '              </label>\n' +
        '          </div>\n' +
        '        </th>\n' +
        '        <th>创建时间</th>\n' +
        '        <th>文件名称</th>\n' +
        '        <th>直播ID</th>\n' +
        '        <th>直播名称</th>\n' +
        '        <th>直播状态</th>\n' +
        '        <th>操作</th>\n' +
        '      </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '    <% for(var i = 0; i < data.length; i++) { %>  \n' +
        '        <tr data-id="<%=data[i].attributes[\'id\']%>">\n' +
        '          <th scope="row">\n' +
        '            <div class="checkbox">\n' +
        '                <label>\n' +
        '                    <input type="checkbox" id="<%=data[i].attributes[\'id\']%>" <% if (data[i].attributes["isChecked"]) { %>checked="true"<% } %>>\n' +
        '                        <span class="checkbox-material">\n' +
        '                            <span class="check">\n' +
        '                        </span>\n' +
        '                    </span>\n' +
        '                </label>\n' +
        '            </div>\n' +
        '          </th>\n' +
        '          <td><%=data[i].attributes["updateTimeFormated"]%></td>\n' +
        '          <td><%=data[i].attributes["filename"]%></td>\n' +
        '          <td><%=data[i].attributes["liveId"]%></td>\n' +
        '          <td><%=data[i].attributes["liveName"]%></td>\n' +
        '          <td><%=data[i].attributes["statusName"]%></td>\n' +
        '          <td>\n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" index="<%=i%>" class="view" title="查看">\n' +
        '                  <span class="glyphicon glyphicon-eye-open"></span>\n' +
        '              </a>\n' +
        '              <a href="javascript:void(0)" id="<%=data[i].attributes[\'id\']%>" class="delete" title="删除">\n' +
        '                  <span class="glyphicon glyphicon-trash"></span>\n' +
        '              </a>\n' +
        '          </td>\n' +
        '        </tr>\n' +
        '    <% } %>  \n' +
        '    </tbody>\n' +
        '</table>\n' +
        '';

    this['JST']['tpl/liveRecord/liveRecord.tabcontent.html'] = '<div class="liverecord-tab">\n' +
        '    <div class="error-ctn"></div>\n' +
        '    <div class="row opt-ctn">\n' +
        '        <div class="col-md-12">\n' +
        '            <form class="form-inline">\n' +
        '<!--                 <div class="form-group region">\n' +
        '                    <label>地区</label>\n' +
        '                    <div class="drop-ctn">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">中国标准</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group bucket">\n' +
        '                    <label>Bucket</label>\n' +
        '                    <div class="drop-ctn">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">All</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div> -->\n' +
        '                <div class="form-group date-group drop-ctn">\n' +
        '                    <label>时间</label>\n' +
        '                    <div class="btn-group" role="group">\n' +
        '                      <button type="button" class="btn btn-default active" id="seven-days">近7天</button>\n' +
        '                      <button type="button" class="btn btn-default" id="thirty-days">近30天</button>\n' +
        '                      <button type="button" class="btn btn-default" id="month">当月</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <button type="button" class="btn btn-default calendar"></button>\n' +
        '            </form>\n' +
        '            <form class="form-inline">\n' +
        '                <div class="form-group">\n' +
        '                    <label for="liverecorde-id">直播ID</label>\n' +
        '                    <input type="text" class="form-control" id="liverecorde-id">\n' +
        '                </div>\n' +
        '<!--                 <div class="form-group">\n' +
        '                    <label for="liverecorde-name">直播名称</label>\n' +
        '                    <input type="text" class="form-control" id="liverecorde-name">\n' +
        '                </div> -->\n' +
        '                <div class="form-group">\n' +
        '                    <label for="liverecorde-filename">文件名称</label>\n' +
        '                    <input type="text" class="form-control" id="liverecorde-filename">\n' +
        '                </div>\n' +
        '                <a href="javascript:void(0)" class="btn btn-primary query"><span class="glyphicon glyphicon-search"></span>查询</a>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-11 operation">\n' +
        '            <a href="javascript:void(0)" class="btn btn-danger multi-delete"><span class="glyphicon glyphicon-trash"></span>批量删除</a>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="table-ctn table-responsive"></div>\n' +
        '<!--     <div class="page-ctn row">\n' +
        '        <div class="col-md-8" style="text-align:center">\n' +
        '            <div class="pagination"></div>\n' +
        '        </div>\n' +
        '        <div class="col-md-4" style="text-align:center">\n' +
        '            <form class="form-inline page-info">\n' +
        '                <div class="form-group">\n' +
        '                    <p class="form-control-static">每页显示</p>\n' +
        '                    <div class="drop-ctn dropup">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">10 条</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="form-control-static total-items">共<span class="text-primary">0</span>条记录</div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div> -->\n' +
        '</div>';

    this['JST']['tpl/loading.html'] = '<div class="spinner">\n' +
        '    <div class="rect1"></div>\n' +
        '    <div class="rect2"></div>\n' +
        '    <div class="rect3"></div>\n' +
        '    <div class="rect4"></div>\n' +
        '    <div class="rect5"></div>\n' +
        '</div>';

    this['JST']['tpl/modal.html'] = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>\n' +
        '        <h4 class="modal-title" id="myModalLabel"></h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-primary">确定</button>\n' +
        '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>';

    this['JST']['tpl/sidebar.html'] = '<ul class="nav nav-pills nav-stacked">\n' +
        '  <li id="home" class="summary active"><a href="#">直播概览</a></li>\n' +
        '  <li id="livemanage" class="livemanage"><a href="#/livemanage">直播管理</a></li>\n' +
        '  <li id="liverecord" class="liverecord"><a href="#/liverecord/none">直播收录</a></li>\n' +
        '  <li id="globalsetup" class="globalsetup"><a href="#/globalsetup">全局配置</a></li>\n' +
        '  <li id="statistics" class="statistics"><a href="#/statistics">统计报表</a></li>\n' +
        '<!--   <li id="help" class="help"><a href="#/help">帮助中心</a></li>\n' +
        '  <li id="logdownload" class="logdownload"><a href="#/logdownload">日志下载</a></li>\n' +
        ' --></ul>';

    this['JST']['tpl/statistics/statistics.businessctn.html'] = '<div class="statistics-tabcontent">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <div class="table-ctn table-responsive"></div>\n' +
        '    <div class="page-ctn row" style="display:none">\n' +
        '        <div class="col-md-8" style="text-align:center">\n' +
        '            <div class="pagination"></div>\n' +
        '        </div>\n' +
        '        <div class="col-md-4" style="text-align:center">\n' +
        '            <form class="form-inline page-info">\n' +
        '                <div class="form-group">\n' +
        '                    <p class="form-control-static">每页显示</p>\n' +
        '                    <div class="drop-ctn dropup">\n' +
        '                        <div class="btn-group">\n' +
        '                            <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                            <span id="cur-value">10 条</span>\n' +
        '                            <span class="caret"></span>\n' +
        '                            </button>\n' +
        '                            <ul class="dropdown-menu"></ul>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="form-group">\n' +
        '                    <div class="form-control-static total-items">共<span class="text-primary"></span>条记录</div>\n' +
        '                </div>\n' +
        '            </form>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/statistics/statistics.home.html'] = '<div class="statistics-pannel ksc-tab">\n' +
        '    <h2 class="ksc-title-2">统计报表</h2>\n' +
        '    <div class="well">\n' +
        '        <div class="row opt-ctn">\n' +
        '            <div class="col-md-12">\n' +
        '                <form class="form-inline">\n' +
        '                    <div class="form-group region" style="display:none">\n' +
        '                        <label>地区</label>\n' +
        '                        <div class="drop-ctn">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">中国标准</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="form-group bucket" style="display:none">\n' +
        '                        <label>Bucket</label>\n' +
        '                        <div class="drop-ctn">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">加载中...</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu long-dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="form-group orther option1" style="display:none">\n' +
        '                        <label>业务</label>\n' +
        '                        <div class="drop-ctn">\n' +
        '                            <div class="btn-group">\n' +
        '                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n' +
        '                                <span id="cur-value">并发数</span>\n' +
        '                                <span class="caret"></span>\n' +
        '                                </button>\n' +
        '                                <ul class="dropdown-menu"></ul>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="form-group date-group drop-ctn">\n' +
        '                        <div class="btn-group" role="group">\n' +
        '                          <button type="button" class="btn btn-default active" id="seven-days">近7天</button>\n' +
        '                          <button type="button" class="btn btn-default" id="thirty-days">近30天</button>\n' +
        '                          <button type="button" class="btn btn-default" id="month">当月</button>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <button type="button" class="btn btn-default calendar"></button>\n' +
        '                    <button type="button" class="btn btn-default calendar-single" style="display:none"></button>\n' +
        '                    <a href="javascript:void(0)" class="btn btn-sm btn-primary btn-apply">应用</a>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <!-- Nav tabs -->\n' +
        '    <ul class="nav nav-tabs" role="tablist">\n' +
        '        <li class="active">\n' +
        '            <a data-target="#flow-statistics" data-toggle="tab">流量统计</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#bandwidth-statistics" data-toggle="tab">带宽统计</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#usernum-statistics" data-toggle="tab">用户数统计</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#storage-statistics" data-toggle="tab">存储容量</a>\n' +
        '        </li>\n' +
        '        <li>\n' +
        '            <a data-target="#business-analysis" data-toggle="tab">业务分析</a>\n' +
        '        </li>\n' +
        '    </ul>\n' +
        '    <!-- Tab panes -->\n' +
        '    <div class="tab-content well">\n' +
        '        <div role="tabpanel" class="tab-pane fade in active" id="flow-statistics"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="bandwidth-statistics"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="usernum-statistics"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="storage-statistics"></div>\n' +
        '        <div role="tabpanel" class="tab-pane fade" id="business-analysis"></div>\n' +
        '    </div>\n' +
        '    <p class="text-center">统计数据供参考，实际费用以帐单为准</p>\n' +
        '</div>';

    this['JST']['tpl/statistics/statistics.tabcontent.html'] = '<div class="statistics-tabcontent">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 error-ctn"></div>\n' +
        '    </div>\n' +
        '    <form class="form-inline flow-header">\n' +
        '        <div class="form-group">\n' +
        '            <span>上传流量：</span>\n' +
        '            <span class="flow-upload text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <span>下载流量：</span>\n' +
        '            <span class="flow-download text-info">加载中...</span>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <form class="form-inline bandwidth-header">\n' +
        '        <div class="form-group">\n' +
        '            <span>上传带宽峰值：</span>\n' +
        '            <span class="bandwidth-upload text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group upload-time-ctn">\n' +
        '            <span>时间：</span>\n' +
        '            <span class="bandwidth-upload-time text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <span>下载带宽峰值：</span>\n' +
        '            <span class="bandwidth-download text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group download-time-ctn">\n' +
        '            <span>时间：</span>\n' +
        '            <span class="bandwidth-download-time text-info">加载中...</span>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <form class="form-inline usernum-header">\n' +
        '        <div class="form-group">\n' +
        '            <span>在线峰值人数：</span>\n' +
        '            <span class="usernum-max text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <span>30日平均在线人数：</span>\n' +
        '            <span class="usernum-avg text-info">加载中...</span>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <form class="form-inline storage-header">\n' +
        '        <div class="form-group">\n' +
        '            <span>总量：</span>\n' +
        '            <span class="storage-total text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <span>增量：</span>\n' +
        '            <span class="storage-increment text-info">加载中...</span>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '            <span>删除量：</span>\n' +
        '            <span class="storage-delete text-info">加载中...</span>\n' +
        '        </div>\n' +
        '    </form>\n' +
        '    <hr style="margin-top:0">\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 chart-line"></div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-md-12 chart-pie"></div>\n' +
        '    </div>\n' +
        '    <div class="row content-panel">\n' +
        '        <div class="col-md-12">\n' +
        '            <h4>内容分析</h4>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row content-panel">\n' +
        '        <div class="col-md-6">\n' +
        '            <div class="panel panel-default">\n' +
        '                <div class="panel-body">\n' +
        '                    <form class="form-inline">\n' +
        '                        <div class="form-group">\n' +
        '                            日均观看时长：\n' +
        '                            <span class="h4"><span class="text-danger">0</span>分钟/人</span>\n' +
        '                        </div>\n' +
        '                    </form>\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-md-6">\n' +
        '                            <p class="h4">\n' +
        '                                <small>较前一日：</small>\n' +
        '                                <span class="num">0</span>\n' +
        '                                <span class="glyphicon glyphicon-arrow-up text-danger"></span>\n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                        <div class="col-md-6">\n' +
        '                            <p class="h4">\n' +
        '                                <small>上周同期：</small>\n' +
        '                                <span class="num">0</span>\n' +
        '                                <span class="glyphicon glyphicon-arrow-down text-success"></span>\n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col-md-6">\n' +
        '            <div class="panel panel-default">\n' +
        '                <div class="panel-body">\n' +
        '                    <form class="form-inline">\n' +
        '                        <div class="form-group">\n' +
        '                            日均观看量：\n' +
        '                            <span class="h4"><span class="text-danger">0</span>个/人</span>\n' +
        '                        </div>\n' +
        '                    </form>\n' +
        '                    <div class="row">\n' +
        '                        <div class="col-md-6">\n' +
        '                            <p class="h4">\n' +
        '                                <small>较前一日：</small>\n' +
        '                                <span class="num">0</span>\n' +
        '                                <span class="glyphicon glyphicon-arrow-up text-danger"></span>\n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                        <div class="col-md-6">\n' +
        '                            <p class="h4">\n' +
        '                                <small>上周同期：</small>\n' +
        '                                <span class="num">0</span>\n' +
        '                                <span class="glyphicon glyphicon-arrow-down text-success"></span>\n' +
        '                            </p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    this['JST']['tpl/statistics/statistics.table.html'] = '<table class="table table-striped">\n' +
        '    <thead>\n' +
        '      <tr>\n' +
        '        <th>URL</th>\n' +
        '        <th>数量</th>\n' +
        '      </tr>\n' +
        '    </thead>\n' +
        '    <tbody>\n' +
        '    <% for(var i = 0; i < data.length; i++) { %>  \n' +
        '        <tr data-id="<%=i%>">\n' +
        '          <td><%=data[i]["keys"]%></td>\n' +
        '          <td><%=data[i]["size"]%></td>\n' +
        '    <% } %>  \n' +
        '    </tbody>\n' +
        '</table>\n' +
        '';

    return this['JST'];
});