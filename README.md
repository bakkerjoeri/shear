# `shear`

`shear` is a node CLI tool that helps you find potentially unused twig templates.

## Installation
```
npm install -g shear
```

## Usage
Simply running `shear` will report any twig files not found to be used in any other twig files in the project.

```
shear
```

A report typically looks like this:
```
Found 2 potentially unused templates:
- button-purchase.twig
- hero-banner.twig
```

Note that it reports *potentially* unused templates. `shear` can't recognize any dynamic template inclusion, extension or embedding (using string concatenation, for instance), so you need to double check the reported results to be certain it's never used.