function playPauseVideo() {
let videos = document.querySelectorAll("video");
videos.forEach((video) => {
  // We can only control playback without insteraction if video is mute
  video.muted = true;
  // Play is a promise so we need to check we have it
  let playPromise = video.play();
  if (playPromise !== undefined) {
      playPromise.then((_) => {
          let observer = new IntersectionObserver(
              (entries) => {
                  entries.forEach((entry) => {
                    video.muted = false;
                      if (
                          entry.intersectionRatio !== 1 &&
                          !video.paused
                      ) {
                          video.pause();
                      } else if (video.paused) {

                          video.play();
                      }
                  });
              },
              { threshold: 0.2 }
          );
          observer.observe(video);
      });
  }
});
}

function pauseVideos()
{
  $('video').each(function() {
    console.log($(this).attr('id'));
    document.querySelectorAll('video').forEach(vid => {
      vid.pause();
      vid.removeAttribute('src'); // empty source
      vid.load();
    });
});

}

function unmuteVideos()
{
  $('video').each(function() {
    console.log($(this).attr('id'));
    document.querySelectorAll('video').forEach(vid => {
      vid.muted = false;
    });
});

}



function action(value, type, window_id, window_parameters, blank)
{
  if(type == 'window')
  {
    // Modal
    window_open(window_id, window_parameters);
  }
  else
  {
    if(blank) window.open(value, '_blank');
    else window.location.href = value;
  }
}

function window_open(window_id, parameters, unique_id)
{
  pauseVideos();
  var dialog_id = 'window_'+window_id;
  var dialog_wrapper = 'wrapper_'+dialog_id;

  if(unique_id)
  {
    dialog_id += '_'+unique_id;
    dialog_wrapper += '_'+unique_id;
    parameters += '&unique_id='+unique_id;

  }
  var z_index_plus = 200;

  if(window.modals_z_index) window.modals_z_index += z_index_plus;
  else window.modals_z_index = z_index_plus;
  //console.log(window.modals_z_index);

  if(!$('#'+dialog_wrapper).length) $('body').append('<div id="'+dialog_wrapper+'"></div>');
  //$('#'+dialog_wrapper).html('<div class="modal" id="'+dialog_id+'"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="d-flex justify-content-center p-5" style="margin: 50px 0px">  <div class="spinner-border text-secondary" role="status">    <span class="visually-hidden">Loading...</span>  </div></div></div></div></div>');

  $('#'+dialog_id).modal('show');

  var total_modals = $('.modal').length;
  //$('#'+dialog_id+'_backdrop').remove();

  $('.modal').each(function(index){
    if($(this).attr('id') == dialog_id)
    {
      $(this).css('z-index', 1000 + window.modals_z_index);
      $('.modal-backdrop').eq(index).attr('id', dialog_id+'_backdrop').css('z-index', 900 + window.modals_z_index);
    }
    /*else
    {
      $(this).css('z-index', 8000 - (index * z_index_plus));
      $('#'+$(this).attr('id')+'_backdrop').css('z-index', 7900 - (index * z_index_plus));
    }*/
  });
  $('.modal-backdrop').each(function(index){
    if(!$(this).attr('id')) $(this).remove();
  });


  $.ajax({
	  type: "POST",
	  url: window.data.siteurl+'/windows/'+window_id+'?'+parameters,
    processData: false,
      //data: {app: app_name},
      //dataType: 'json'
    })
  .done(function( data ) {

    $('#'+dialog_id).modal('hide');


    //$('#'+dialog_id+'_backdrop').remove();

    $('#'+dialog_wrapper).html(data);
    $('#'+dialog_id).modal('show');
    bind_forms();
    init_images();
    /*
    if(dialog != 'element_new' && dialog != 'menu_item_new')
    {
      window.opened_modals.push({
        app_dialog : app_dialog,
        parameters: parameters,
        unique_id: unique_id,
        title: $('#'+dialog_wrapper+' #modal_main_title').html(),
      });
    }*/

    $('.tooltip').remove();

    //console.log(window.opened_modals);

    //$('#'+dialog).modal('toggle');

    $('.modal').each(function(index){
      if($(this).attr('id') == dialog_id)
      {
        $(this).css('z-index', 1000 + window.modals_z_index);
        $('.modal-backdrop').eq(index).attr('id', dialog_id+'_backdrop').css('z-index', 900 + window.modals_z_index);
      }
      /*else
      {
        $(this).css('z-index', 8000 - (index * z_index_plus));
        $('#'+$(this).attr('id')+'_backdrop').css('z-index', 7900 - (index * z_index_plus));
      }*/
    });

    $('.modal-backdrop').each(function(index){
      if(!$(this).attr('id')) $(this).remove();
    });

     document.getElementById(dialog_id).addEventListener('hidden.bs.modal', function (event) {
      //let playPromise = video.play();


      pauseVideos();

      $('.tooltip').remove();
      /*if(dialog != 'element_new' && dialog != 'menu_item_new')
      {
        var index_to_delete = window.opened_modals.length - 1;
        window.opened_modals.splice(index_to_delete,1);
      }
*/
setTimeout(function(){
  $('#'+dialog_id).modal('dispose');
  $('#'+dialog_wrapper).remove();
  $('#'+dialog_id+'_backdrop').remove();
}, 10);


      });

  });



}

function ajax_results(form_selector, method, results_selector)
{
    if(window.data.ajax_loading == true) return false;
    window.data.ajax_loading = true;

    var form = $(form_selector);
    var results = $(results_selector);

    var count = Number(form.find('[name="count"]').val());
    var offset = Number(form.find('[name="offset"]').val());

    var total = parseInt($(results_selector+'_total').text());

    if(offset > total)
    {
      window.data.ajax_loading = false;
      return false;
    }

    var loading_html = '<div id="loading_block_temp">'+$('#loading_block').html()+'</div>';
    //$(results_selector).append(loading_html);

    $.ajax({
	  type: "POST",
	  url: window.data.siteurl+"/api/"+method+'?key='+window.data.api_key,
      data: form.serialize(),
      dataType: 'json'
    })
  .done(function( data ) {
    var html = '';

    var total = data.total;

    if(data.total == 0)
    {
      results.append('<div class="">'+window.data.no_data+'</div>');
      $(results_selector+'_total').text('0');
      //return false;
    }
    else
    {
      $.each(data.data, function(index, item) {
        html += Mustache.render(data.template, item);
      })
      results.append(html);

      $(results_selector+'_total').text(data.total);
      //tooltipInit();
      form.find('[name="offset"]').val(offset+count);

      setTimeout(function() {

        if($(results_selector).data('grid') == true)
        {

            if(window.data.masonry[results_selector]) $(results_selector).kh_masonry('reloadItems');
            window.data.masonry[results_selector] = $(results_selector).kh_masonry({
              itemSelector: '.grid-item',
              percentPosition: true,
              transitionDuration: 0,
              masonry: {

              }
            });
            $('#app-main').height($(results_selector).height()+350);
        }

        //image_preview_init();
        init_images();
      }, 50); // setTimeout



    }

    // Sorting
    if(!$(results_selector+'_sorting').html())
    {
      var sorting_html = '';

      $.each(data.sorting, function(index, item) {
        sorting_html += '<option value="'+item[0]+'|asc"';
        if(data.sorting_default == item[0]+'|asc') sorting_html += ' selected="selected"';
        sorting_html += '>'+item[1]+' &uarr;</option>';

        sorting_html += '<option value="'+item[0]+'|desc"';
        if(data.sorting_default == item[0]+'|desc') sorting_html += ' selected="selected"';
        sorting_html += '>'+item[1]+' &darr;</option>';

      })
      $(results_selector+'_sorting').html(sorting_html)
    }

    if(data.total == 0) return false;

    $('#loading_block_temp').remove();
    if (typeof window.api_done_functions[form_selector+'_loaded'] === "function") {
      window.api_done_functions[form_selector+'_loaded'](data);
    }


    window.data.ajax_loading = false;
  });

}
var delayTimer;
function ajax_results_init(form_selector, method, results_selector, height_offset)
{
  $(results_selector+'_total').html('<img src="'+window.data.siteurl+'/desktop/images/loader16.gif" />');
  window.data.ajax_loading = false;
  var form = $(form_selector);
  if(!form.find('[name="offset"]').val()) form.find('[name="offset"]').val('0');
  //$(results_selector).html('');

  form.find('#btn-search').click(function() {
    if(form.find('[name="offset"]').val()) form.find('[name="offset"]').val('0');
    $(results_selector).html('');
    window.data.ajax_loading = false;
    ajax_results(form_selector, method, results_selector, height_offset);
  });

  form.find('select,input:not("input[type=text]")').on('change', function() {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
    if(form.find('[name="offset"]').val()) form.find('[name="offset"]').val('0');
    $(results_selector).html('');
    window.data.ajax_loading = false;
    ajax_results(form_selector, method, results_selector, height_offset);
  }, 300); // Will do the ajax stuff after 1000 ms, or 1 s
});


  form.find('input[type=text]').on('keyup', function() {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
      if(form.find('[name="offset"]').val()) form.find('[name="offset"]').val('0');
        $(results_selector).html('');
        window.data.ajax_loading = false;
        ajax_results(form_selector, method, results_selector, height_offset);
    }, 500); // Will do the ajax stuff after 1000 ms, or 1 s
  });



  ajax_results(form_selector, method, results_selector);

  window.data.height = $(window).height();
  $(window).scroll(function() {

    if($(window).scrollTop() + window.data.height >= $(document).height() - height_offset) {
      ajax_results(form_selector, method, results_selector);
    }
  });
}


function send_form(id)
{
  var form_selector = '#'+id;
  var $form = $(form_selector);
  var formData = new FormData($(form_selector)[0]);

  $.ajax({
    type: "POST",
    url: $form.data('api-loading_url'),
      //data: formData,
      async: true,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json'
    })
  .done(function( data ) {
    $('#holder_'+id).html(data.result.html);


    //bind_forms();
    $.ajax({
      type: "POST",
      url: $form.data('api-url'),
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json'
      })
    .done(function( data ) {

      $('#holder_'+id).replaceWith(data.result.html);
      bind_forms();

    });

  });




}




function bind_forms()
{
  $('form[data-api-type="form"]').each(function(){

    if(!$(this).find('#unique_form_id').val()) var form_id = makeid(8);
    else var form_id = $(this).find('#unique_form_id').val();

    $(this).prop('id', form_id);
    $(this).parent().prop('id', 'holder_'+form_id);
    $(this).find('#unique_form_id').val(form_id);
    $(this).find('#page_url').val(window.data.page_url);

    $(this).find('button').click(function(){
      send_form(form_id);
    });

    $(this).submit(function(e){
      e.preventDefault();
      send_form(form_id);
    })
  });
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
charactersLength));
 }
 return result;
}


function sidebar_form_reset()
{
    $('#products_filters').trigger('reset');
    window.price_slider.reset();
    $('#remove_filters').hide();
    $('#products_search, #top_search').val('');
    $('#products_results').html('');
    ajax_results_init('#products_filters', 'shop.get', '#products_results', 350);
}

function open_cart()
{
  $('#cart_modal .modal-body').html('<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>');

  $('#cart_modal').modal('show');

  $('#cart_modal .modal-body').load(window.data.cart_url, function() {

  })
}

function open_auth()
{
  $('#login_modal .modal-body').html('<div class="spinner-border mx-auto my-5" role="status"><span class="visually-hidden">Loading...</span></div>');

  $('#login_modal').modal('show');

  $('#login_modal .modal-body').load(window.data.login_window, function() {

  })
}

function add_to_cart(item_id, quantity, quick)
{
  $.ajax({
  type: "POST",
  url: window.data.siteurl+'/api/cart.add',
  data: {
    id: item_id,
    quantity: quantity,
  },
  //dataType: 'json'
  })
  .done(function( data ) {
    $('#top-cart .top-cart-number').removeClass('hidden').text(data.total_items);
    if(!quick) open_cart();
  //window.location.href='';

  });
}

function reload_cart_()
{
  $('#cart_modal .modal-body').html('<div class="h-100 d-flex align-items-center justify-content-center"><div class="spinner-border  " role="status"><span class="visually-hidden">Loading...</span></div></div>');
  $('#cart_modal .modal-body').fadeOut('fast', function(){
    $('#cart_modal .modal-body').load(window.data.cart_url, function() {
      $('#cart_modal .modal-body').fadeIn('fast');
    });
  });
}

function reload_cart()
{
  $('#cart_modal .modal-body').load(window.data.cart_url, function() {
  });
}

function delete_from_cart(item_id, reload)
{
  $('#cart_row_'+item_id).hide('fast', function(){

  $.ajax({
  type: "POST",
  url: window.data.siteurl+'/api/cart.delete',
  data: {
    id: item_id,
  },
  //dataType: 'json'
  })
  .done(function( data ) {
    $('#top-cart .top-cart-number').removeClass('hidden').text(data.total_items);
    if(data.total_items == 0) $('#top-cart .top-cart-number').addClass('hidden');
    reload_cart();
  if(reload == 1) window.location.href='';

  });
});

}

function cart_update_quantity(item_id, quantity, reload)
{
  $.ajax({
  type: "POST",
  url: window.data.siteurl+'/api/cart.update_quantity',
  data: {
    id: item_id,
    quantity: quantity,
  },
  //dataType: 'json'
  })
  .done(function( data ) {
    //$('#top-cart .top-cart-number').removeClass('hidden').text(data.total_items);
    reload_cart();
  //window.location.href='';
  if(reload == 1) window.location.href='';
  });
}

function cart_minus_quantity(selector)
{
  if(parseInt($(selector).val()) > 1) $(selector).val(parseInt($(selector).val())-1);
}

function cart_plus_quantity(selector)
{
  $(selector).val(parseInt($(selector).val())+1);
}

function cart_clear()
{
  $.ajax({
  type: "POST",
  url: window.data.siteurl+'/api/cart.clear',
  data: {},
  //dataType: 'json'
  })
  .done(function( data ) {
    $('#top-cart .top-cart-number').addClass('hidden');
    reload_cart();

  });
}

function stickyInit()
{

	if(window.outerWidth >= 768)
	{
		$("#sticky").stick_in_parent({offset_top: 90, parent: ".floatingSidebar"});
		$('#sticky')
		  .on('sticky_kit:bottom', function(e) {
			$(this).parent().css('position', 'static');

		  })
		  .on('sticky_kit:unbottom', function(e) {
			$(this).parent().css('position', 'relative');
		  })

	}


}

function form_to_api(form_selector, api_method, function_name) {

  //var formData = $(form_selector).serialize();
  var formData = new FormData($(form_selector)[0]);

  /*for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }*/

  $.ajax({
    type: "POST",
    url: window.data.siteurl+'/api/'+api_method,
      data: formData,
      async: true,
      cache: false,
      contentType: false,
      processData: false,
      dataType: 'json'
    })
  .done(function( data ) {
    if (typeof window.api_done_functions[function_name] === "function") {
    window.api_done_functions[function_name](data);
    }

  });

}


function set_cart_user_data(name, value)
{
	//set_delivery_method(name);
	$.ajax({
	  type: "POST",
	  url: window.data.siteurl+'/api/shop.set_cart_user_data',
      data: {
		name: name,
		value: value,
	},
      dataType: 'json'
    })
    .done(function( data ) {
		console.log(data);

    });

}

function create_order()
{
	open_loading_dialog();
	$.ajax({
	  type: "POST",
	  url: window.data.siteurl+'/api/orders.create',
      data: {

	},
      dataType: 'json'
    })
    .done(function( data ) {
		//console.log(data);

		window.location.href=window.data.siteurl+'/lk/orders?message=order_created';

    });
}

function open_loading_dialog()
{
	$('#loading_modal').modal('show');
}

function bind_forms()
{
  $('form[data-api-type="form"]').each(function(){

    if(!$(this).find('#unique_form_id').val()) var form_id = makeid(8);
    else var form_id = $(this).find('#unique_form_id').val();

    $(this).prop('id', form_id);
    $(this).parent().prop('id', 'holder_'+form_id);
    $(this).find('#unique_form_id').val(form_id);
    $(this).find('#page_url').val(window.location.href);

    $(this).find('button').click(function(){

      send_form(form_id);
    });

    $(this).submit(function(e){
      e.preventDefault();
      send_form(form_id);
    })
  });
}

function init_images()
{
  $('img[data-kh-init="img_autoresize"], *[data-kh-init="bg_img_autoresize"]').each(function() {
    var window_width = $(window).width();
    console.log(window_width);

    $this = $(this);
    var src = $this.data('src');

    var src_parts = src.split('/');
    var src_filename = src_parts.pop();
    var filename_parts = src_filename.split('.');
    var src_ext = filename_parts.pop();

    //console.log($this);

    if($this.data('ext')) var ext = $this.data('ext');
    else var ext = src_ext;

    filename_parts.push(ext);
    var width = $this[0].clientWidth;
    var height = $this[0].clientHeight;

    if($this.data('size-sm') && window_width < 576) var size = $this.data('size-sm');
    else if($this.data('size-md') && window_width < 768) var size = $this.data('size-md');
    else if($this.data('size-lg') && window_width < 992) var size = $this.data('size-lg');
    else if($this.data('size-xl') && window_width < 1200) var size = $this.data('size-xl');
    else if($this.data('size-xxl') && window_width < 1400) var size = $this.data('size-xxl');
    else if($this.data('size')) var size = $this.data('size');
    else var size = width+'x'+height;

    if(size == 'auto') size = width+'x'+height;

    size = size.toString();

    var size_parts = size.split('x');
    if(size_parts[0] == 'FULL') size_parts[0] = window_width;

    if(!size_parts[1]) size_parts.push('H');

    size = size_parts.join('x');


    var new_filename = size+'_'+filename_parts.join('.');
    src_parts.push(new_filename);
    var new_src = src_parts.join('/');

    if($this.data('kh-init') == 'img_autoresize') $(this).attr('src', new_src);
    if($this.data('kh-init') == 'bg_img_autoresize') $(this).css('background-image', 'url(' + new_src + ')');

    console.log(new_src);
    //var size =

      //console.log(src_filename);
  });
}

$(document).ready(function() {
  setTimeout(init_images, 200);
  bind_forms();

});

window.onresize = function() {
  setTimeout(init_images, 1000);
};
