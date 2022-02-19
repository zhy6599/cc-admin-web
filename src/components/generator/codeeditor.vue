<template>
  <codemirror v-model="item.value" @changes="changes" :options="cmOptions"
                  codemirrorIgnore="true" />
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/vue/vue.js';
import 'codemirror/theme/monokai.css';

// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js';
// hint
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/selection/active-line.js';
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/match-highlighter.js';
// keyMap
import 'codemirror/mode/clike/clike.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/keymap/sublime.js';
// foldGutter
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/xml-fold.js';

export default {
  components: { codemirror },
  props: {
    options: Object,
    mode: String,
    item: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    changes() {
    },
  },
  watch: {},
  computed: {
    cmOptions() {
      return {
        value: '',
        theme: 'monokai',
        tabSize: 2,
        lineNumbers: true,
        line: true,
        readOnly: false,
        mode: this.mode,
      };
    },
  },
  mounted() {
  },
};
</script>
<style lang="stylus">
.CodeMirror
  border 1px solid #eee
  height auto
</style>
