<template>
  <v-layout text-xs-center wrap>
    <v-flex mb-4>
      <h1 class="display-5 font-weight-bold mb-3">
        {{ msg }}
      </h1>
      <p class="subheading font-weight-regular">
        For a guides on how to use this interface,
        <br />please reference the links below
      </p>
    </v-flex>

    <v-flex xs12 mb-5>
      <h2 class="headline font-weight-bold mb-2">Documentation</h2>

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
export default {
  name: 'welcome',
  props: {
    msg: String
  },
  data: () => ({
    documentation: [
      {
        text: 'CDS Frontend UI Doc',
        href:
          'https://github.com/GoogleCloudPlatform/datashare-toolkit/frontend'
      }
    ],
    importantLinks: [
      {
        text: 'CDS Home',
        href: 'https://github.com/GoogleCloudPlatform/datashare-toolkit'
      },
      {
        text: 'Google Cloud',
        href: 'https://cloud.google.com'
      }
    ]
  })
};
</script>
