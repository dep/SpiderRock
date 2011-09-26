$(document).ready(function(){
  init_external_links();
  init_parent_links();
  init_pre_conversion();
  init_home_class();
  init_lightbox();
  /* Old Authentication model
   * removed per request.
  init_cookie();
  init_login();
  init_sitelock(); */
});
$(window).load(function() {
  init_image_dimensions();
});

/* Scans the DOM for links with the
 * rel="external" attribute and
 * sets a click event to open said
 * link in a new window. */
function init_external_links() {
  $("a[rel='external']").click(function() {
    window.open($(this).attr('href'));
    return false;
  });
}

/* This is a Javascript-driven fix to target
 * link categories and make them "unclickable".
 * A class is also added that is targeted for CSS
 * purposes. */
function init_parent_links() {
  $(".widget_pages li").each(function() {
    if (!$(this).parent().hasClass("children")) {
      $(this).addClass("parent");
      $(this).find("a").first().addClass("parent");
    }
  });
  $(".widget_pages a.parent").click(function() {
    return false;
  });
}

/* Converting <pre> to <p> for friendlier pasting in to Wordpress */
function init_pre_conversion() {
  $(".contents pre").each(function() {
    $(this).replaceWith($('<p>' + nl2br(this.innerHTML) + '</p>'));
  });
}
function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

/* Adding a homepage class for css targeting */
function init_home_class() {
  if ($(".contents h2").html().match("Home")) {
    $(".contents").addClass("home");
  }
}

function init_lightbox() {
  $("a.lightbox").fancybox({
    'autoScale': false
  });
}

function init_sitelock() {
  if($.cookie('spiderrock_granted') == "logged_in") {
  } else {
    $(".sidebar a, .home p a, #footer a").click(function() {
      alert("You must login to access this site.\n\nTo request a login, please call 1-312-256-9618 or email Annabelle Baldwin Annabelle.Baldwin@spiderrockexs.com");
      return false;
    });
    $("input[type='password']").keypress(function(e){
      if(e.which == 13){
        $("#login_button").trigger('click');
      }
    });
  }
}
function site_unlock() {
  $(".sidebar a, .home p a, #footer a").unbind("click");
  init_parent_links();
}
function init_cookie() {
  if($.cookie('spiderrock_granted') == "logged_in") {
    site_unlock();
  } else {
    $("#box_button").show();
  }
}
function store_cookie() {
  $.cookie('spiderrock_granted', 'logged_in', { expires: 7, path: '/' });
}
function init_login() {
  $("#login_button").click(function() {
    if($("#username").val() == "spiderrock" && $("#password").val() == "algorithm") {
      store_cookie();
      site_unlock();
      $("#box_button").hide();
      $("#login_box").fadeOut();
      $("#success_box").fadeIn();
      setTimeout("$('#success_box').fadeOut()", 1500);
    } else {
      $("#error_msg").html("Password incorrect");
    }
  });
}

function init_image_dimensions() {
  $("img").each(function() {
    $(this).attr("width", $(this).width())
    $(this).attr("height", $(this).height());
  });
}
