# `shear`

`shear` is a node CLI tool that helps you find usage of twig templates.

## Installation
```
npm install -g shear
```

## Usage

### `shear prune [templates..] [-s [sources..]]`
`shear prune` helps you find potentially unused templates.

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

The optional `-s` or `--source` flag takes a list of filepatterns to search in for usage:

```
shear prune components/**/*.twig --source pages/**/*.twig
```

### `shear inspect <template> [-s [source..]]`
`shear inspect` reports a list of templates that are probably using it.

```
shear inspect components/button.twig
```

The optional `-s` or `--source` flag takes a list of filepatterns to search in for usage:

```
shear inspect components/button.twig -s pages/**/*.twig
```

### `shear dynamic [-s | --source [source..]]`
`shear dynamic` reports a list of all templates in a project that contain concatenated or variable `include`, `embed` or `extends`.

```
shear dynamic
```

The optional `-s` or `--source` flag takes a list of filepatterns to search in for dynamic inclusion:

```
shear dynamic -s pages/**/*.twig
```
