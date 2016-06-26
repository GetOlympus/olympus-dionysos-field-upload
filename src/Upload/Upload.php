<?php

namespace GetOlympus\Field;

use GetOlympus\Hera\Field\Controller\Field;
use GetOlympus\Hera\Translate\Controller\Translate;

/**
 * Builds Upload field.
 *
 * @package Field
 * @subpackage Upload
 * @author Achraf Chouk <achrafchouk@gmail.com>
 * @since 0.0.1
 *
 * @see https://olympus.readme.io/v1.0/docs/upload-field
 * @see https://olympus.readme.io/v1.0/docs/upload-multiple-field
 *
 */

class Upload extends Field
{
    /**
     * Prepare variables.
     */
    protected function setVars()
    {
        $this->getModel()->setFaIcon('fa-upload');
        $this->getModel()->setScript('js'.S.'upload.js');
        $this->getModel()->setStyle('css'.S.'upload.css');
        $this->getModel()->setTemplate('upload.html.twig');
    }

    /**
     * Prepare HTML component.
     *
     * @param array $content
     * @param array $details
     */
    protected function getVars($content, $details = [])
    {
        // Build defaults
        $defaults = [
            'id' => '',
            'title' => Translate::t('upload.title', [], 'uploadfield'),
            'default' => [],
            'description' => '',
            'library' => 'image',
            'multiple' => false,
            'expand' => false,
            'alt' => '',
            'caption' => '',
            'can_upload' => current_user_can('upload_files'),

            // texts
            't_add_media' => Translate::t('upload.add_media', [], 'uploadfield'),
            't_add_medias' => Translate::t('upload.add_medias', [], 'uploadfield'),
            't_delete_item' => Translate::t('upload.delete_selection', [], 'uploadfield'),
            't_delete_all' => Translate::t('upload.delete_all', [], 'uploadfield'),
            't_cannot_upload' => Translate::t('upload.cannot_upload', [], 'uploadfield'),

            't_sizes' => Translate::t('upload.sizes.title', [], 'uploadfield'),
            't_size_full' => Translate::t('upload.sizes.full', [], 'uploadfield'),

            't_alt' => Translate::t('upload.alt', [], 'uploadfield'),
            't_caption' => Translate::t('upload.caption', [], 'uploadfield'),
        ];

        // Build defaults data
        $vars = array_merge($defaults, $content);

        // Special case
        $vars['library'] = 'pdf' === $vars['library'] ? 'application/pdf' : $vars['library'];

        // Retrieve field value
        $vars['val'] = $this->getValue($content['id'], $details, $vars['default']);

        // Update vars
        $this->getModel()->setVars($vars);
    }
}
