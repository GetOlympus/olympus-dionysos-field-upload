<?php

namespace GetOlympus\Dionysos\Field;

use GetOlympus\Zeus\Field\Field;

/**
 * Builds Upload field.
 *
 * @package    DionysosField
 * @subpackage Upload
 * @author     Achraf Chouk <achrafchouk@gmail.com>
 * @since      0.0.1
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
    protected $script = 'js'.S.'upload.js';

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
    protected function getDefaults() : array
    {
        return [
            'title' => parent::t('upload.title', $this->textdomain),
            'default' => [],
            'can_upload' => false,
            'description' => '',
            'multiple' => false,
            'type' => 'image',
            'size' => 'thumbnail',

            // texts
            't_addblock_description' => parent::t('upload.addblock_description', $this->textdomain),
            't_addblocks_description' => parent::t('upload.addblocks_description', $this->textdomain),
            't_cannot_upload' => parent::t('upload.cannot_upload', $this->textdomain),

            't_addblock_label' => parent::t('upload.addblock_label', $this->textdomain),
            't_editblock_label' => parent::t('upload.editblock_label', $this->textdomain),
            't_name_label' => parent::t('upload.name_label', $this->textdomain),
            't_removeblock_label' => parent::t('upload.removeblock_label', $this->textdomain),
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
    protected function getVars($value, $contents) : array
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
