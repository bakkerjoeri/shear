# `shear`

`shear` is a node CLI tool that helps you find usage of twig templates.

## Installation
```
npm install -g shear
```

## Usage

### `shear prune`
`shear prune` helps you find potentially unused templates.

```
shear prune [templates..]

Find potentially unused templates.

Positionals:
  templates  Template file patterns to find usage of.
                                                [array] [default: ["**/*.twig"]]

Options:
  -h, --help     Show help                                             [boolean]
  -f, --from     Template file patterns to search in.
                                                [array] [default: ["**/*.twig"]]
  -v, --version  Show version number                                   [boolean]
```

Simply running `shear prune` without any arguments will report any twig files not found to be used in any other twig files in the project.

```
shear prune
```

A report typically looks like this:
```
Found 2 potentially unused templates:
- button-purchase.twig
- hero-banner.twig
```

Note that it reports *potentially* unused templates. `shear` can't recognize any dynamic template inclusion, extension or embedding (using string concatenation, for instance), so you need to double check the reported results to be certain it's never used.

Optionally, you can define patterns for both `templates` and the source wherein to look for their inclusion:
```
shear prune components/**/*.twig --from pages/**/*.twig
```