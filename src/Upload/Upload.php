<?php

namespace GetOlympus\Field;

use GetOlympus\Hera\Controllers\Field;
use GetOlympus\Hera\Controllers\Translate;

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
     * @var string
     */
    protected $faIcon = 'fa-upload';

    /**
     * @var string
     */
    protected $template = 'upload.html.twig';

    /**
     * Prepare HTML component.
     *
     * @param array $content
     * @param array $details
     *
     * @since 0.0.1
     */
    protected function getVars($content, $details = [])
    {
        // Build defaults
        $defaults = [
            'id' => '',
            'title' => Translate::t('upload.title'),
            'default' => [],
            'description' => '',
            'library' => 'image',
            'multiple' => false,
            'expand' => false,
            'alt' => '',
            'caption' => '',
            'can_upload' => OLH_CAN_UPLOAD,

            // details
            'post' => 0,
            'prefix' => '',
            'template' => 'pages',

            // texts
            't_add_media' => Translate::t('upload.add_media'),
            't_add_medias' => Translate::t('upload.add_medias'),
            't_delete_item' => Translate::t('upload.delete_selection'),
            't_delete_all' => Translate::t('upload.delete_all'),
            't_cannot_upload' => Translate::t('upload.cannot_upload'),

            't_sizes' => Translate::t('upload.sizes.title'),
            't_size_full' => Translate::t('upload.sizes.full'),

            't_alt' => Translate::t('upload.alt'),
            't_caption' => Translate::t('upload.caption'),
        ];

        // Build defaults data
        $vars = array_merge($defaults, $content);
        $vars['library'] = 'pdf' === $vars['library'] ? 'application/pdf' : $vars['library'];

        // Retrieve field value
        $vars['val'] = $this->getValue($details, $vars['default'], $content['id'], true);

        // Update vars
        $this->getField()->setVars($vars);
    }
}
