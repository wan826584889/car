const state = {
    main: '',
    imgId: '2593',
    imgArr: [],
    allImg: [],

}

const mutations = {
    main: (state, { data }) => {
        state.main = data
    },
    imgId: (state, { data }) => {
        state.imgId = data
    },
    imgArr: (state, { data }) => {
        state.imgArr = data
    },
    allImg: (state, { data }) => {
        state.allImg = data
    }
}

const actions = {
    main: (context, payload) => {
        context.commit('main', {
            ...payload
        })
    },
    imgId: (context, payload) => {
        context.commit('imgId', {
            ...payload
        })
    },
    imgArr: (context, payload) => {
        context.commit('imgArr', {
            ...payload
        })
    },
    allImg: (context, payload) => {
        context.commit('allImg', {
            ...payload
        })
    }
}

export default {
    state,
    mutations,
    actions
}