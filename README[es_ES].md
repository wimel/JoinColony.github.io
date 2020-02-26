# Página web de Colony

Este proyecto fue desarrollado con [Gatsby](https://www.gatsbyjs.org/).

## Instalación, ejecución de un servidor para el desarrollo y despliege

#### Instalación de dependencias

```sh
yarn
```

#### Lint y comprobaciones de funcionamiento

```sh
yarn lint
yarn flow
```

#### Ejecución de un servidor de desarrollo en local

```sh
yarn dev
```

Esto iniciará un servidor de desarrollo local en el puerto `8000`.

- Web: `http://localhost:8000/`
- GraphiQL: `http://localhost:8000/___graphql`

#### Desarrollando y desplegando

Ejecutando `deploy` desplegará este proyecto en github pages (si está configurado para hacerlo).

```sh
yarn build
yarn deploy
```
---

## Desarrollo

- [Intro](#intro)
- [Internalización](#i18n)
  - [Cómo funciona](#how-it-works)
  - [Escribiendo documentos Markdown en lenguajes alternativos](#writing-markdown)
    - [Configuración del proyecto](#project-config)
    - [Frontmatter](#frontmatter)
    - [Enlazando con otras páginas de documentación](#linking-docs)
  - [Configurando Locales](#configuration)

<h3 id="intro">Intro</h3>

Dado que el contenido de este sitio web se obtiene tanto localmente dentro del proyecto como externamente (como GitHub para las páginas de documentos), hay algunas partes móviles que hay que tener en cuenta.

<h2 id="i18n">Internalización</h2>


<h3 id="how-it-works">Cómo funciona</h3>

Se accede a locales a través de subdirectorios con gTLD (véase la sección titulada "**Utilización de URL específicas de la localidad**" en [este artículo](https://support.google.com/webmasters/answer/182192?hl=en#) publicado por el equipo de Google Search Console).
  - Por ejemplo: `/es/` o `/fr/`
  - Por defecto locale está en inglés (`en`). Si no se proporciona un locale, se utilizará el predeterminado.

<h3 id="writing-markdown">Escribiendo documentos Markdown en lenguajes alternativos</h3>

<h4 id="project-config">Configuración del proyecto</h4>

La configuración del proyecto es un archivo `json` que contiene ciertos atributos y metadatos sobre un proyecto, como archivos de logotipos, descripción del proyecto, orden de sección, etc. El directorio `docs` de cada proyecto debe contener uno, o los documentos del proyecto serán omitidos cuando se obtengan los documentos.

Hay dos configuraciones de proyecto opcionales (pero muy recomendadas) posibles en cuanto a las traducciones:

- Orden de la sección traducida
- Descripción traducida

Vamos a analizar esto...

#### Orden de la sección traducida

Usando los nombres de las secciones traducidos en [doc frontmatter](#frontmatter), los nombres de las secciones ya estarán traducidos. **Sin embargo, los nombres de las secciones traducidas deben ser ordenados**. Esto se logra con un objeto parecido a un mapa. La localización es la clave, y el valor es un conjunto de nombres de sección traducidos **en orden**:

```javascript
// doc.config.json

{
    "sectionOrder": ["Docs", "Interface", "Modules"], // <-- Lenguaje por defecto en la orden de la sección traducida
    "sectionTranslations": {
        "es": ["Docs", "Interfaz", "Modulós"] // <-- Orden de la sección para locale `es`
    }
}
```

#### Descripción traducida

De manera similar al orden de la sección traducida anterior, la descripción del proyecto también debe ser traducida, y se hace con un objeto parecido a un mapa. Locale es la clave, y el valor es la cadena traducida:

```javascript
// doc.config.json

{
    "description": "The purser library is a...", // <-- Descripción del lenguaje por defecto
    "descriptionTranslations": {
        "es": "La biblioteca de Purser es una..." // <-- Descripción del proyecto para locale `es`
    }
}
```
<h4 id="frontmatter">Frontmatter</h4>

- La documentación del proyecto escrita en otros locales debe ser etiquetada con el frontmatter apropiado del `locale`, y este `locale` **debe** coincidir con uno de los locales configurados para el sitio web.
  - Si el `locale` de la documentación es uno con el que el sitio web aún no está configurado, se omitirá cuando los documentos se obtengan.
  - Si a un documento en un idioma alternativo le falta el frontmatter `locale`, se obtendrá y se colocará directamente al lado de los documentos por defecto (en este caso, en inglés).

Este es un ejemplo de frontmatter para una página de documentación en `purser` configurado para el locale `es`:

```markdown
---
title: Visión General
section: Docs
order: 0
locale: es
---

... Doc content ...

```

La solución obtenida para el ejemplo anterior sería `/es/${docsSlugPrefix}/purser/docs-vision-general`

<h4 id="linking-docs">Enlazando con otras páginas de documentación</h4>

Las páginas de documentos a menudo se enlazan entre sí, o a páginas de documentos de otros proyectos. A veces, otros proyectos (o incluso otras páginas doc dentro del mismo proyecto) pueden no tener el mismo soporte de lenguaje. Por lo tanto, la ruta a la página doc relacionada debe ser local-explícita cuando se utiliza un idioma alternativo.

Aquí están las dos formas en las que se pueden escribir los enlaces en los documentos Markdown:
- Enlace a la documentación en locale por defecto: `/${slugifiedProjectName}/${slugifiedSection}-${slugifiedTitle}/`
- Enlace a la documentación en locale alternativo: `/${locale}/${slugifiedProjectName}/${slugifiedSection}-${slugifiedTitle}/`

#### Aquí un posible ejemplo para una página de documentación con `purser`:

##### Frontmatter de la documentación que queremos enlazar

```markdown
---
title: Interfaz de la Wallet Común
section: Interfaz
order: 0
locale: es
---
```

##### Enlace sobre la documentación ☝️ 

```markdown
[La Interfaz de la Wallet común](/es/purser/interfaz-interfaz-de-la-billetera-comun/)
```

> ##### Nota: Cuando la plantilla `DocPage` renderice esto, los enlaces serán analizados y el intérprete sabrá que debe reescribir la url con el `DocSlugPrefix` introducido. El path resultante sería ``/es/${docsSlugPrefix}/purser/interfaz-interfaz-de-la-billetera-comun/``.

<h3 id="configuration">Configurando Locales</h3>

Intentar acceder a un locale que no está configurado resultará en un resultado 404, incluso si las páginas del documento están escritas para dicho locale. Para habilitar un locale en particular para todo el sitio web, deben suceder algunas cosas:

1. [Coméntale a Gatsby acerca del nuevo locale](#configure-tell-gatsby)
2. [Configura `react-intl` para usar un nuevo locale](#configure-react-intl)
3. [Añada versiones de locale específicas de `pages` Gatsby](#configure-add-locale-versions)

<h5 id="configure-tell-gatsby">1. Coméntale a Gatsby acerca del nuevo locale</h5>

Actualiza el array `CONFIGURED_LOCALES` en `i18nConfig` para incluir el nuevo locale.

Esto le comenta a ambos `gatsby-plugin-i18n` y `gatsby-transform-md-docs` acerca del nuevo locale, y permite el enrutamiento y la creación de páginas de documentos (para cualquier documento con esa localización especificada en su frontmatter).

<h5 id="configure-react-intl">2. Configura `react-intl` para usar un nuevo locale</h5>

Añade un objeto `LocaleConfig` al objeto `localeMessages` en `/src/modules/layouts/GlobalLayout/GlobalLayout.jsx`.

Crea un archivo de mensajes e impórtalo, junto con el conjunto de datos de lenguaje correcto de `react-intl` y entrégaselos al objeto de configuración.

Este es un ejemplo con ambos, `en` y `es`:

```javascript
// GlobalLayout.jsx

import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

import enMessages from '~i18n/en.json';
import esMessages from '~i18n/es.json';

const localeMessages: LocaleConfigs = {
  en: {
    messages: enMessages,
    data: enLocaleData,
  },
  es: {
    messages: esMessages,
    data: esLocaleData,
  },
};
```

Esto configura los datos de locale para el `IntlProvider`, y ayuda a establecer el locale desde la url.

<h5 id="configure-add-locale-versions">3. Añada versiones para locale específicas de `pages` Gatsby</h5>

Para cada página (se encuentra en `/src/pages/`), agregue una versión específica de locale. Esto puede simplemente exportar el mismo componente que la versión de locale por defecto - sólo se requiere debido a que la convención de `gats por plugin-i18n` es de ese tipo.

Por ejemplo:

```
\_ pages
  \_ index.js <-- Esta es la versión por defecto
  \_ index.es.js <-- Esta es la versión `es`
```
