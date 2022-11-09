import { noteService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    name: 'note-index',
    props: [],
    template: `
        <h1>NOTE INDEX</h1>
        `,
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    components: {
        noteFilter,
        noteList,

    },
}
