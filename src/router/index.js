import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import CreateNoteView from '../views/CreateNoteView.vue'
import ProfileView from '../views/ProfileView.vue'
import TrashView from '../views/TrashView.vue'
import NotesByLabelView from '../views/NotesByLabelView.vue'
import SearchNotesView from '../views/SearchNotesView.vue'

const routes = [
  {
    path: '/',
    name: 'login-home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'CreateNoteView',
    component: CreateNoteView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/note/:id',
    name: 'CreateNote',
    component: CreateNoteView
  },
  {
    path: '/trash',
    name: 'TrashView',
    component: TrashView
  },
  {
    path: '/label/:id',
    name: 'NotesByLabelView',
    component: NotesByLabelView
  },
  {
    path: '/search/:text',
    name: 'SearchNotesView',
    component: SearchNotesView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
