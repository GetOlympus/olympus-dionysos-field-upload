<?php

namespace GetOlympus\Field;

use GetOlympus\Zeus\Field\Controller\Field;
use GetOlympus\Zeus\Translate\Controller\Translate;

/**
 * Builds Image field.
 *
 * @package Field
 * @subpackage Image
 * @author Achraf Chouk <achrafchouk@gmail.com>
 * @since 0.0.1
 *
 */

class Upload extends Field
{
    /**
     * @var array
     */
    protected $adminscripts = ['media', 'wp-util', 'zeus-upload'];

    /**
     * @var string
     */
    protected $style = 'css'.S.'upload.css';

    /**
     * @var string
     */
    protected $template = 'upload.html.twig';

    /**
     * @var string
     */
    protected $textdomain = 'uploadfield';

    /**
     * Prepare defaults.
     *
     * @return array
     */
    protected function getDefaults()
    {
        return [
            'title' => Translate::t('upload.title', $this->textdomain),
            'default' => [],
            'can_upload' => false,
            'description' => '',
            'multiple' => false,
            'type' => 'image',
            'size' => 'thumbnail',

            // texts
            't_add_media' => Translate::t('upload.add_media', $this->textdomain),
            't_add_medias' => Translate::t('upload.add_medias', $this->textdomain),
            't_delete_item' => Translate::t('upload.delete_selection', $this->textdomain),
            't_delete_all' => Translate::t('upload.delete_all', $this->textdomain),
            't_cannot_upload' => Translate::t('upload.cannot_upload', $this->textdomain),

            't_dimensions' => Translate::t('upload.dimensions', $this->textdomain),
            't_label' => Translate::t('upload.label', $this->textdomain),
            't_size' => Translate::t('upload.size', $this->textdomain),
            't_url' => Translate::t('upload.url', $this->textdomain),
        ];
    }

    /**
     * Prepare variables.
     *
     * @param  object  $value
     * @param  array   $contents
     *
     * @return array
     */
    protected function getVars($value, $contents)
    {
        // Get contents
        $vars = $contents;

        // Works on value
        $vars['value'] = !is_array($value) ? [$value] : (isset($value['url']) ? [$value] : $value);

        // Check if user can upload
        $vars['can_upload'] = current_user_can('upload_files');

        // Update vars
        return $vars;
    }
}
