define(["utils/utils","mvc/upload/upload-settings","mvc/upload/upload-ftp","mvc/ui/ui-popover","mvc/ui/ui-misc","mvc/ui/ui-select","utils/uploadbox"],function(a,b,c,d,e){return Backbone.View.extend({status_classes:{init:"status fa fa-exclamation text-primary",ready:"status fa fa-check text-success",running:"status fa fa-spinner fa-spin",success:"status fa fa-check",error:"status fa fa-exclamation-triangle"},initialize:function(a,b){this.app=a;var c=this;this.model=b.model,this.setElement(this._template(b.model)),this.uploadinput=this.$el.uploadinput({ondragover:function(){c.model.get("enabled")&&c.$el.addClass("warning")},ondragleave:function(){c.$el.removeClass("warning")},onchange:function(a){"running"!=c.model.get("status")&&a&&a.length>0&&(c.model.set("file_data",a[0]),c.model.set("file_name",a[0].name),c.model.set("file_size",a[0].size),c.model.set("file_mode",a[0].mode||"local"),c._refreshReady())}}),this.button_menu=new e.ButtonMenu({icon:"fa-caret-down",pull:"left"}),this.$("#source").append(this.button_menu.$el),this.button_menu.addMenu({icon:"fa-laptop",title:"Choose local file",onclick:function(){c.uploadinput.dialog()}}),this.button_menu.addMenu({icon:"fa-code-fork",title:"Choose FTP file",onclick:function(){c._showFtp()}}),this.button_menu.addMenu({icon:"fa-pencil",title:"Paste/Fetch data",onclick:function(){c.model.set("file_mode","new")}}),this.ftp=new d.View({title:"FTP files",container:this.$("#source").find(".ui-button-menu"),placement:"right"}),this.settings=new d.View({title:"Upload configuration",container:this.$("#settings"),placement:"bottom"}),this.$("#text-content").on("keyup",function(a){c.model.set("url_paste",$(a.target).val()),c.model.set("file_size",$(a.target).val().length),c._refreshReady()}),this.$("#settings").on("click",function(){c._showSettings()}).on("mousedown",function(a){a.preventDefault()}),this.model.on("change:percentage",function(){c._refreshPercentage()}),this.model.on("change:status",function(){c._refreshStatus()}),this.model.on("change:info",function(){c._refreshInfo()}),this.model.on("change:file_name",function(){c._refreshFileName()}),this.model.on("change:file_mode",function(){c._refreshMode()}),this.model.on("change:file_size",function(){c._refreshFileSize()}),this.model.on("remove",function(){c.remove()}),this.app.collection.on("reset",function(){c.remove()})},render:function(){this.$("#file_name").html(this.model.get("file_name")||"-"),this.$("#file_desc").html(this.model.get("file_desc")||"Unavailable"),this.$("#file_size").html(a.bytesToString(this.model.get("file_size"))),this.$("#status").removeClass().addClass(this.status_classes.init)},remove:function(){Backbone.View.prototype.remove.apply(this)},_refreshReady:function(){this.app.collection.each(function(a){a.set("status",a.get("file_size")>0&&"ready"||"init")})},_refreshMode:function(){var a=this.model.get("file_mode");"new"==a?(this.height=this.$el.height(),this.$("#text").css({width:this.$el.width()-16+"px",top:this.$el.height()-8+"px"}).show(),this.$el.height(this.$el.height()-8+this.$("#text").height()+16),this.$("#text-content").val("").trigger("keyup"),this.model.set("file_data",null),this.model.set("file_name","New File")):(this.$el.height(this.height),this.$("#text").hide())},_refreshInfo:function(){var a=this.model.get("info");a?this.$("#info-text").html("<strong>Failed: </strong>"+a).show():this.$("#info-text").hide()},_refreshPercentage:function(){var a=parseInt(this.model.get("percentage"));0!=a?this.$(".progress-bar").css({width:a+"%"}):(this.$(".progress-bar").addClass("no-transition"),this.$(".progress-bar").css({width:"0%"}),this.$(".progress-bar")[0].offsetHeight,this.$(".progress-bar").removeClass("no-transition")),this.$("#percentage").html(100!=a?a+"%":"Adding to history...")},_refreshStatus:function(){var a=this.model.get("status");this.$("#status").removeClass().addClass(this.status_classes[a]),this.model.set("enabled","running"!=a),this.$("#text-content").attr("disabled",!this.model.get("enabled")),this.$el.removeClass("success danger warning"),("running"==a||"ready"==a)&&this.model.set("percentage",0),"running"==a?this.$("#source").find(".button").addClass("disabled"):this.$("#source").find(".button").removeClass("disabled"),"success"==a&&(this.$el.addClass("success"),this.model.set("percentage",100),this.$("#percentage").html("100%")),"error"==a?(this.$el.addClass("danger"),this.model.set("percentage",0),this.$("#info-progress").hide(),this.$("#info-text").show()):(this.$("#info-progress").show(),this.$("#info-text").hide())},_refreshFileName:function(){this.$("#file_name").html(this.model.get("file_name")||"-")},_refreshFileSize:function(){this.$("#file_size").html(a.bytesToString(this.model.get("file_size")))},_showFtp:function(){if(this.ftp.visible)this.ftp.hide();else{this.ftp.empty();this.ftp.append(new c(this.app,{style:"radio",add:function(){},remove:function(){}}).$el),this.ftp.show()}},_showSettings:function(){this.settings.visible?this.settings.hide():(this.settings.empty(),this.settings.append(new b(this).$el),this.settings.show())},_template:function(a){return'<tr id="upload-item-'+a.id+'" class="upload-item"><td><div id="source"/><div class="text-column"><div id="text" class="text"><div class="text-info">You can tell Galaxy to download data from web by entering URL in this box (one per line). You can also directly paste the contents of a file.</div><textarea id="text-content" class="text-content form-control"/></div></div></td><td><div id="status"/></td><td><div id="file_desc" class="title"/></td><td><div id="file_name" class="title"/></td><td><div id="file_size" class="size"/></td><td><div id="settings" class="upload-icon-button fa fa-gear"/></td><td><div id="info" class="info"><div id="info-text"/><div id="info-progress" class="progress"><div class="progress-bar progress-bar-success"/><div id="percentage" class="percentage">0%</div></div></div></td></tr>'}})});
//# sourceMappingURL=../../../../maps/mvc/upload/composite/composite-row.js.map