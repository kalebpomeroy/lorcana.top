<template>asdf
    <div class="markdown-content" v-html="parsedArticle"></div>
</template>

<script>
import axios from 'axios';
import { marked } from 'marked';

export default {
    data() {
        return {
            article: null,
        };
    },
    computed: {
        parsedArticle() {
            return this.article ? marked(this.article) : '';
        }
    },
    async mounted() {
        const slug = this.$route.params.slug;
        this.loading = true;

        try {
            const response = await axios.get(`/published/${slug}.md`);
            this.article = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style>
/* Base styles for the blog post container */
.markdown-content {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    font-family: 'Helvetica', 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Headings */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: bold;
    color: #0d222f; /* Dark grey color for text */
}

/* Paragraphs */
.markdown-content p {
    margin-bottom: 1em;
}

/* Links */
.markdown-content a {
    color: #0366d6;
    text-decoration: none;
}

/* Images */
.markdown-content img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

/* Lists */
.markdown-content ul,
.markdown-content ol {
    padding-left: 20px;
    margin-bottom: 1em;
}

/* Code blocks */
.markdown-content pre {
    background-color: #f6f8fa;
    border-radius: 5px;
    padding: 1em;
    overflow-x: auto;
}

.markdown-content code {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
}

/* Blockquotes */
.markdown-content blockquote {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    color: #666;
    margin-left: 0;
    margin-right: 0;
}

/* Make sure to add classes to your HTML elements to match these styles */

</style>
