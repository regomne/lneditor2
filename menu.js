
var Menu=(function(){

  function init()
  {
    var mni=GuiNode.MenuItem;
    var mn=GuiNode.Menu;
    
    var menu1=new mn();
    menu1.append(new mni({label:CurLang.menuSettings, click:mnSettings}));
    $('body').off('contextmenu').on('contextmenu',function(ev){
      //console.dir(ev);
      menu1.popup(ev.clientX,ev.clientY);
      return false;
    });
  }

  function mnSettings()
  {
    var sets=configs.getSettingDefines();
    var optsDiv=$('#configOptions');
    var boxDiv=$('.configBox');

    var maxw=window.innerWidth*0.7;
    boxDiv.css('max-width',maxw>500?500:maxw);
    optsDiv.css('max-height',window.innerWidth*0.8)

    $('#configOK')[0].textContent=CurLang.confirmOK;
    $('#configCancel')[0].textContent=CurLang.confirmCancel;

    $('#configOK').off('click').on('click',function(){
      var conf=configs.saveConfigsFromHtml(sets,'setting');
      if(conf)
      {
        Settings=conf;
        configs.reloadSetting(Settings);
        $.magnificPopup.close();
      }
    });
    $('#configCancel').off('click').on('click',function(){
      $.magnificPopup.close();
    });

    optsDiv[0].textContent='';
    optsDiv.append($(configs.generateConfigHtml(sets,Settings,'setting')));
    $.magnificPopup.open({
      items: {
        src: '#configBox'
      },
      type: 'inline',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      showCloseBtn:false,
      // callbacks:{close: function(arg){
      //   callback(userSelect);
      // }},
    }, 0);
  }

  return {
    init:init,
  };
})();