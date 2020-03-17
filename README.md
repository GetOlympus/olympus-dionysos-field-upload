# Dionysos Upload Field
> This component is a part of the **Olympus Dionysos fields** for **WordPress**.  
> It uses the default `wpMedia` WordPress javascript bundle to manage field.

```sh
composer require getolympus/olympus-dionysos-field-upload
```

---

[![Olympus Component][olympus-image]][olympus-url]
[![CodeFactor Grade][codefactor-image]][codefactor-url]
[![Packagist Version][packagist-image]][packagist-url]
[![MIT][license-image]][license-blob]

---

<p align="center">
    <img src="https://github.com/GetOlympus/olympus-dionysos-field-upload/blob/master/assets/field-upload-64.png" />
</p>

---

## Field initialization

Use the following lines to add a `upload field` in your **WordPress** admin pages or custom post type meta fields:

```php
return \GetOlympus\Dionysos\Field\Upload::build('my_upload_field_id', [
    'title'       => 'What\'s your flavor?',
    'can_upload'  => false,
    'default'     => [],
    'description' => 'Tell me what\'s your flavour!',
    'multiple'    => false,
    'type'        => 'image',
    'size'        => 'thumbnail',

    /**
     * Texts definition
     * @see the `Texts definition` section below
     */
    't_addblock_description'  => 'Click on the "+" button to add a media.',
    't_addblocks_description' => 'Click on the "+" button to add medias.',
    't_cannot_upload'         => 'It seems you are not able to upload files.',
    't_name_label'            => 'Edit the legend',
    't_addblock_label'        => 'Add',
    't_editblock_label'       => 'Edit',
    't_removeblock_label'     => 'Remove',
]);
```

## Variables definition

| Variable      | Type    | Default value if not set | Accepted values |
| ------------- | ------- | ------------------------ | --------------- |
| `title`       | String  | `'Upload'` | *empty* |
| `can_upload`  | Boolean | `false` | `true` or `false` |
| `default`     | Array   | *empty* | *empty* |
| `description` | String  | *empty* | *empty* |
| `multiple`    | Boolean | `false` | `true` or `false` |
| `type`        | String  | `'image'` | default file mime types |
| `size`        | String  | `'thumbnail'` | image sizes from `add_image_size()` [WordPress function](https://developer.wordpress.org/reference/functions/add_image_size/) |

Notes:
* `can_upload` value is defined thanks to `current_user_can('upload_files')` (see [WordPress reference](https://codex.wordpress.org/Function_Reference/current_user_can))
* Set `multiple` to `true` to enable the "Add medias" button

## Texts definition

| Code | Default value | Definition |
| ---- | ------------- | ---------- |
| `t_addblock_description` | Click on the "+" button to add a media. | Main helper to add a single item box |
| `t_addblocks_description` | Click on the "+" button to add medias. | Main helper to add multiple items boxes |
| `t_cannot_upload` | It seems you are not able to upload files. | Error displayed if user cannot upload files |
| `t_name_label` | Edit the legend | Name item's placeholder |
| `t_addblock_label` | Add | Used as an Add button area title |
| `t_editblock_label` | Edit | Used as an Edit button area title |
| `t_removeblock_label` | Remove | Used as a Remove button area title |

## Retrive data

Retrieve your value from Database with a simple `get_option('my_upload_field_id', [])` (see [WordPress reference][getoption-url]).
Below, a `json_encode()` example to understand how data are stored in Database:

```json
{
  "mediaId": {
    "name": "mediaName.mediaExt",
    "id": "mediaId",
    "height": "mediaHeight",
    "url": "mediaUrl",
    "width": "mediaWidth"
  }
}
```

And below, a simple example to show how to iterate on the data array in `PHP`:

```php
// Get upload from Database
$upload = get_option('my_upload_field_id', []);

if (!empty($upload)) {
    foreach ($upload as $img) {
        echo '<figure id="'.$img['id'].'">';
        echo '<img src="'.$img['url'].'" width="'.$img['width'].'" height="'.$img['height'].'" alt="'.esc_html($img['name']).'" />';
        echo '<figcaption>'.$img['name'].'</figcaption>';
        echo '</figure>';
    }
}
```

## Release History

0.0.15
- Display now compatible with new Zeus-Core version

0.0.14
- New Olympus components compatibility
- Change repository to be a part of Dionysos fields

0.0.13
- FIX: retrocompatibility value getter

## Contributing

1. Fork it (<https://github.com/GetOlympus/olympus-dionysos-field-upload/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

**Built with ♥ by [Achraf Chouk](https://github.com/crewstyle "Achraf Chouk") ~ (c) since a long time.**

<!-- links & imgs dfn's -->
[olympus-image]: https://img.shields.io/badge/for-Olympus-44cc11.svg?style=flat-square
[olympus-url]: https://github.com/GetOlympus
[codefactor-image]: https://www.codefactor.io/repository/github/GetOlympus/olympus-dionysos-field-upload/badge?style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/getolympus/olympus-dionysos-field-upload
[getoption-url]: https://developer.wordpress.org/reference/functions/get_option/
[license-blob]: https://github.com/GetOlympus/olympus-dionysos-field-upload/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat-square
[packagist-image]: https://img.shields.io/packagist/v/getolympus/olympus-dionysos-field-upload.svg?style=flat-square
[packagist-url]: https://packagist.org/packages/getolympus/olympus-dionysos-field-upload