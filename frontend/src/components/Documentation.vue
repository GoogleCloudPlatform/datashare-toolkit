<template>
  <v-layout text-xs-center wrap>
    <v-flex my-5 v-if="this.$store.getters.isLoggedIn === false">
      <h1 class="display-5 font-weight-bold mb-3">
        Welcome to Datashare
      </h1>
      <p class="subheading font-weight-regular">
        For a guides on how to use this interface, please reference the links
        below
      </p>
    </v-flex>
    <v-flex xs12 mb-5>
      <h2 class="headline font-weight-bold mb-2">User Guide</h2>
      <v-layout justify-center>
        <a
          v-for="(doc, i) in documentation"
          :key="i"
          :href="doc.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ doc.text }}
        </a>
      </v-layout>
    </v-flex>
    <v-flex xs12 mb-5>
      <h2 class="headline font-weight-bold mb-2">Important Links</h2>
      <v-layout justify-center>
        <a
          v-for="(link, i) in importantLinks"
          :key="i"
          :href="link.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ link.text }}
        </a>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import config from './../config';

export default {
  name: 'documentation',
  data: () => ({
    documentation: [
      {
        text: 'Datashare User Guide',
        href: config.userGuideUrl
      }
    ],
    importantLinks: [
      {
        text: 'Datashare (GitHub)',
        href: config.githubUrl
      },
      {
        text: 'Datashare Overview',
        href: 'https://cloud.google.com/solutions/financial-services/datashare'
      },
      {
        text: 'Consumer use-case',
        href:
          'https://cloud.google.com/blog/topics/financial-services/announcing-the-general-availability-of-datashare'
      },
      {
        text: 'Google Cloud',
        href: 'https://cloud.google.com'
      },
      {
        text: 'Launch announcement',
        href:
          'https://cloud.google.com/press-releases/2021/0527/google-cloud-launches-datashare-for-financial-services'
      }
    ]
  })
};
</script>
