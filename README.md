# Upload Field
> This component is a part of the [**Olympus Zeus Core**][zeus-url] **WordPress** framework.  
> It uses the default WordPress media upload component.

[![Olympus Component][olympus-image]][olympus-url]
[![CodeFactor Grade][codefactor-image]][codefactor-url]
[![Packagist Version][packagist-image]][packagist-url]

## Installation

Using `composer` in your PHP project:

```sh
composer install getolympus/olympus-upload-field
```

## Field initialization

Use the following lines to add a `upload field` in your **WordPress** admin pages or custom post type meta fields:

```php
return \GetOlympus\Field\Upload::build('my_upload_field_id', [
    'title' => 'What\'s your flavor?',
    'can_upload' => false,
    'default' => [],
    'description' => 'Tell me what\'s your flavour!',
    'multiple' => false,
    'type' => 'image',
    'size' => 'thumbnail',

    /**
     * Texts definition
     * @see the `Texts definition` section below
     */
    't_add_media' => 'Add media',
    't_add_medias' => 'Add medias',
    't_delete_item' => 'Delete selection',
    't_delete_all' => 'Delete all medias',
    't_cannot_upload' => 'It seems you are not able to upload files.',
    't_dimensions' => 'Dimensions:',
    't_label' => 'Title:',
    't_size' => 'Size:',
    't_url' => 'URL:',
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
| `t_add_media` | Add media | Used as an add media label button |
| `t_add_medias` | Add medias | Used as an add medias label button if `multiple` is set to `true` |
| `t_delete_item` | Delete selection | Used as a delete selection label button |
| `t_delete_all` | Delete all medias | Used as a delete medias label button |
| `t_cannot_upload` | It seems you are not able to upload files. | Used as an error if user cannot upload files |
| `t_dimensions` | Dimensions: | Dimension image label |
| `t_label` | Title: | Title image label |
| `t_size` | Size: | Size image label |
| `t_url` | URL: | Url image label |

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

* 0.0.10
- [x] ADD: new assets folder

## Authors and Copyright

Achraf Chouk  
[![@crewstyle][twitter-image]][twitter-url]

Please, read [LICENSE][license-blob] for more information.  
[![MIT][license-image]][license-url]

[https://github.com/crewstyle](https://github.com/crewstyle)  
[http://fr.linkedin.com/in/achrafchouk](http://fr.linkedin.com/in/achrafchouk)

## Contributing

1. Fork it (<https://github.com/GetOlympus/olympus-upload-field/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

---

**Built with ♥ by [Achraf Chouk](http://github.com/crewstyle "Achraf Chouk") ~ (c) since a long time.**

<!-- links & imgs dfn's -->
[olympus-image]: https://img.shields.io/badge/for-Olympus-44cc11.svg?style=flat-square
[olympus-url]: https://github.com/GetOlympus
[zeus-url]: https://github.com/GetOlympus/Zeus-Core
[codefactor-image]: https://www.codefactor.io/repository/github/GetOlympus/olympus-upload-field/badge?style=flat-square
[codefactor-url]: https://www.codefactor.io/repository/github/getolympus/olympus-upload-field
[getoption-url]: https://developer.wordpress.org/reference/functions/get_option/
[license-blob]: https://github.com/GetOlympus/olympus-upload-field/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[packagist-image]: https://img.shields.io/packagist/v/getolympus/olympus-upload-field.svg?style=flat-square
[packagist-url]: https://packagist.org/packages/getolympus/olympus-upload-field
[twitter-image]: https://img.shields.io/badge/crewstyle-blue.svg?style=social&logo=twitter
[twitter-url]: http://twitter.com/crewstyle