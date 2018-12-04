const vm = new Vue({
    el: '#app',
    created() {
        this.getUsersData()
    },
    data(){
        return {
            noData: "false",
            isVisible:"false",
            alertSuccess: "",
            alertFailed: "",
            users: [],
            newUsers: {
                formID: "RA-",
                formName: "",
                formEmail: "",
                formPhone: "",
                formJobs: ""
            },
            selectedUser: {}
        }
    },
    methods: {
        getUsersData(){
            axios.get('http://localhost/Node-Project/Vue/VueCRUD/api.php?action=read')
            .then((response)=>{
                if (response.data.error) {
                    vm.alertFailed = response.data.message
                }else {
                    if (response.data.users.length == 0) {
                        vm.isVisible = false
                        vm.noData = true
                    }else {
                        vm.noData = false
                        vm.isVisible = true
                        vm.users = response.data.users
                    }

                }
            })
        },

        addUsers(){
            let formData = vm.toFormData(vm.newUsers)

            if (this.newUsers.formID == "RA-" && this.newUsers.formName == "" && this.newUsers.formEmail == "" && this.newUsers.formPhone == "" && this.newUsers.formJobs == "") {
                swal('Gagal', 'Data masih kosong', 'error')
            }else {
                if (this.newUsers.formPhone < 11 && this.newUsers.formPhone > 13) {
                swal('Peringatan', 'Nomor Telepon Tidak Valid', 'warning')
                } else {
                    axios.post('http://localhost/Node-Project/Vue/VueCRUD/api.php?action=create', formData)
                    .then((response)=>{
                        vm.clear()
                        if (response.data.error) {
                            swal('Gagal', 'Gagal menambah data', 'error')
                            vm.isVisible = false
                        }else {
                            swal('Sukses!', 'Data disimpan', 'success')
                            vm.users = vm.getUsersData()
                        }
                    })
                    
                }
            vm.setVisible()
            }
        },

        updateUsers(){
            let formData = vm.toFormData(vm.selectedUser)
            
            if (this.selectedUser.phone < 11 && this.selectedUser.phone > 13) {
                this.alertFailed = "Nomor Telepon Tidak Valid"
            } else {
                axios.post('http://localhost/Node-Project/Vue/VueCRUD/api.php?action=update', formData)
                .then((response)=>{
                    vm.selectedUser = {}
                    if (response.data.error) {
                        swal('Gagal', 'Gagal mengupdate data', 'error')
                    }else {
                        swal('Sukses!', 'Data diperbarui', 'success')
                        vm.users = vm.getUsersData()
                    }
                })
            }
        },

        deleteUser(){
            let formData = vm.toFormData(vm.selectedUser)
            axios.post('http://localhost/Node-Project/Vue/VueCRUD/api.php?action=delete', formData)
            .then((response)=>{
                vm.selectedUser = {}
                if (response.data.error) {
                    swal('Gagal', 'Gagal menghapus data', 'error')
                }else {
                    swal('Sukses!', 'Data dihapus', 'success')
                    vm.users = vm.getUsersData()
                }
            })
        },


        toFormData(obj){
            const form_data = new FormData();
            for(var key in obj){
                form_data.append(key, obj[key])
            }
            return form_data
        },

        clear(){
            vm.newUsers = {
                formJobs: "RA-",
                formName: "",
                formEmail: "",
                formPhone: "",
                formJobs: ""
            };
            vm.selectedUser = {}
        },

        clickUser(user){
            vm.selectedUser = user
        },

        setVisible(){
            this.isVisible = true
            this.noData = false
        }
    }
});