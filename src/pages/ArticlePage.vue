<template>
    <div v-html="htmlContent" class="markdown-body"></div>
</template>
  
<script>
import axios from 'axios';
import 'github-markdown-css';
import { marked } from 'marked';
  
export default {
    name: 'ArticleComponent',
    data() {
        return {
            htmlContent: '',
        };
    },
    computed: {
        slug() {
            return this.$route.params.slug;
        },
    },
    watch: {
        // Watch for changes on the slug and fetch the markdown file when it changes
        slug(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.fetchMarkdown();
            }
        },
    },
    methods: {
        async fetchMarkdown() {
            if (this.slug) {
                try {
                    const response = await axios.get(`/published/${this.slug}.md`);
                    this.htmlContent = marked(response.data);
                } catch (error) {
                    console.error('Error fetching markdown:', error);
                    // Handle the error appropriately
                }
            }
        },
    },
    mounted() {
        this.fetchMarkdown();
    },
};
</script>

<style>
.markdown-body {
    line-height: 1.6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 15px;
    max-width: 740px;
    margin: 20px auto;
    background-color: #0d222f;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.1);
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}

.markdown-body h1 {
    font-size: 2em;
}

.markdown-body h2 {
    font-size: 1.5em;
}

.markdown-body h3 {
    font-size: 1.25em;
}

.markdown-body h4 {
    font-size: 1em;
}

.markdown-body h5 {
    font-size: 0.875em;
}

.markdown-body h6 {
    font-size: 0.85em;
    color: #6a737d;
}

.markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
}

.markdown-body ul,
.markdown-body ol {
    padding-left: 2em;
    margin-top: 0;
    margin-bottom: 0;
}

.markdown-body li {
    margin-top: 5px;
}

.markdown-body a {
    color: #0366d6;
    text-decoration: none;
}

.markdown-body a:hover {
    text-decoration: underline;
}

.markdown-body img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}

.markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
}

.markdown-body code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,0.05);
    border-radius: 3px;
}

.markdown-body blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    margin: 0;
}


</style>