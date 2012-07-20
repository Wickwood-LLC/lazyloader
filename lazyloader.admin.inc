<?php
/* $Id$ */

/**
 * @file
 * Lazyloader
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */
 
/**
 * Admin Form: UI
 *
 */
function lazyloader_admin($form, &$form_state, $op = NULL) {

  global $_lazyloader_defaults;
  
  $settings = variable_get('lazyloader', $_lazyloader_defaults);
   
  $form = array();

  $form['lazyloader'] = array(
    '#type'          => 'fieldset',
    '#title'         => 'Lazyloader Configuration',
    '#collapsible'   => TRUE,
    '#collapsed'     => FALSE,
    '#tree'          => TRUE,
    '#description'   => t(''),
  );  
    
  $form['lazyloader']['enabled'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Enabled'),
    '#default_value' => $settings['enabled'], 
    '#description'   => t('Enable/Disable Lazyloader (Useful for testing)'),                   
    '#prefix'        => '<div class="lazy-columns clearfix"><div class="lazy-column lazy-column-1">',
  );   

  $form['lazyloader']['distance'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Distance'),
    '#default_value' => $settings['distance'],
    '#size'          => 5, 
    '#maxlength'     => 5,
    '#description'   => t('The distance (in pixels) of image to the viewable browser window, which will trigger the loading of the actual image.'),                   
  );

  $form['lazyloader']['placeholder'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Placeholder Image'),
    '#default_value' => $settings['placeholder'],
    '#description'   => t('Path to your placeholder image, ex. sites/default/files/placeholder_image.gif. Leave it blank to use the default.'),                   
  );
  
  $loader_dir = base_path() . drupal_get_path('module', 'lazyloader') . '/loader/';
  $loader = array(0 => t('None'));
  for ($i = 1; $i <= 8; $i++) {
    $loader[$i] = '<img alt="Lazyloader Icon" src="' . $loader_dir . 'loader-' . $i . '.gif" />';
  }
  
  $form['lazyloader']['loader_icon'] = array(
    '#type'          => 'radios',
    '#title'         => t('Loader Icon'),
    '#options'       => $loader,
    '#default_value' => $settings['loader_icon'],
    '#description'   => t('This icon will show when the actual image is not yet fully loaded.'),                   
    '#suffix'        => '</div>',
  );  

  $form['lazyloader']['exclude'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Excluded Pages'),
    '#default_value' => $settings['exclude'],
    '#description'   => t('List the page paths to be excluded from lazyloading on each line.'),                   
    '#prefix'        => '<div class="lazy-column lazy-column-2">',
    '#suffix'        => '</div></div>',
  ); 

  $form['save']      = array( '#type' => 'submit', '#value' => t('Save'), );
  $form['reset']     = array( '#type' => 'submit', '#value' => t('Reset'), ); 

  //dsm($form);
  return $form;  
}


/**
 * Admin Form: Submit
 *
 */
function lazyloader_admin_submit($form, $form_state) {
  //dsm($form);
  $form_values = $form_state['values'];
  $settings = $form_values['lazyloader'];
  variable_set('lazyloader', $settings);
}


 
