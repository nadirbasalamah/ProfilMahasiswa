var Application = {
    initApplication  :function () {
        $(window).load('pageinit','#page-one',function () {
            Application.initShowMhs();
        })
        $(document).on('click','#detail-mhs',function () {
            var nim = $(this).data('nimmhs');
            Application.initShowDetailMhs(nim);
        })
    },
    initShowMhs : function () {
        $.ajax({
            url:"https://nadir008basalamah.000webhostapp.com/API/web_service.php",
            type: "get",
            dataType: "json",
            beforeSend : function () {
                $.mobile.loading('show',{
                    text : 'Please wait while retrieving data...',
                    textVisible : true
                });
            },
            success : function (data) {
                var appendList = "";
                for (let index = 0; index < data.length; index++) {
                    appendList += '<li><a href=#page-two?id='+data[index].NIM+
                    '" target="_self" id="detail-mhs" data-nimmhs="'+data[index].NIM+'"><h2>'+data[index].Nama+
                    '</h2><p>'+data[index].NIM+'</p><p><b>'+data[index].Fakultas+'</b></p></a></li>'       
                    
                }
             $('#list-mhs').append(appendList); 
             $('#list-mhs').listview('refresh'); 
            },
            complete : function () {
                $.mobile.loading('hide');
            }
        });
    },
    initShowDetailMhs : function (nim) {
        $.ajax({
            url : 'https://nadir008basalamah.000webhostapp.com/API/web_service.php',
            type : 'get',
            dataType: "json",
            beforeSend : function () {
                $.mobile.loading('show',{
                    text : 'Please wait while retrieving data...',
                    textVisible : true
                });
            },
            success : function (data) {
                let obj;
                for (let index = 0; index < data.length; index++) {
                    if(nim == data[index].NIM) {
                        obj = data[index];
                        break;
                    }
                }
                $('#p-nim,#p-nama,#p-jurusan,#p-fakultas,#p-alamat,#p-nohp').empty();
                $('#p-nim').append('<b>NIM      : </b>'+obj.NIM);
                $('#p-nama').append('<b>Nama     : </b>'+obj.Nama);
                $('#p-jurusan').append('<b>Jurusan  : </b>'+obj.Jurusan);
                $('#p-fakultas').append('<b>Fakultas : </b>'+obj.Fakultas);
                $('#p-alamat').append('<b>Alamat   : </b>'+obj.Alamat);
                $('#p-nohp').append('<b>NoHP     : </b>'+obj.NoHp);
            },
            complete  :function () {
                $.mobile.loading('hide');
            }
        });
    }
};