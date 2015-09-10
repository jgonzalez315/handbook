angular.module('sertecpet.controllers', [])

    .controller('MedidasCtrl', function ($scope, Medidas) {
        $scope.medidas = Medidas.all();
        $scope.remove = function (medida) {
            Medidas.remove(medida);
        }
    })
    .controller('CapacidadesCtrl', function ($scope, Capacidades) {

        $scope.capacidades = Capacidades.all();

        $scope.selected = { id: 0 };

        $scope.remove = function (capacidades) {
            Capacidades.remove(capacidades);
        }


    })
    .controller('CalculoCapacidadesCtrl', function ($scope, $stateParams, Capacidades,Medidas, $filter) {

        $scope.medidas = Medidas.all();
        $scope.capacidades=Capacidades.all();
        $scope.capacidad = Capacidades.get($stateParams.capacidadID);
        $scope.unidadLongitudNew=null;
        $scope.unidadLongitudOld= null;
        $scope.unidadVolumenNew=null;
        $scope.unidadVolumenOld=null;

        $scope.borrar= function(){

            $scope.capacidad.variables.d=0;
            $scope.capacidad.variables.l=0;
            $scope.capacidad.variables.h=0;
            $scope.capacidad.variables.volumen=0;
            $scope.capacidad.variables.capacidad=0;
            $scope.capacidad.variables.b=0;
            $scope.capacidad.variables.id=0;
            $scope.capacidad.variables.idCasing=0;
            $scope.capacidad.variables.odTubing=0;
            $scope.capacidad.variables.volumenAnular=0;
        }
        $scope.$watch('medidas[4].seleccionado', function(newValues, oldValues,$scope) {
            $scope.unidadLongitudNew=newValues;
            $scope.unidadLongitudOld= oldValues;


            for(var i =0; i< ($scope.capacidades).length; i++){

                $scope.capacidades[i].variables.d=Medidas.transformarIda($scope.capacidades[i].variables.d, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.l=Medidas.transformarIda($scope.capacidades[i].variables.l, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.h=Medidas.transformarIda($scope.capacidades[i].variables.h, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.b=Medidas.transformarIda($scope.capacidades[i].variables.b, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.id=Medidas.transformarIda($scope.capacidades[i].variables.id, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.idCasing=Medidas.transformarIda($scope.capacidades[i].variables.idCasing, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');
                $scope.capacidades[i].variables.odTubing=Medidas.transformarIda($scope.capacidades[i].variables.odTubing, $scope.unidadLongitudNew,$scope.unidadLongitudOld,'longitud');



                $scope.capacidades[i].variables.d=$filter('setDecimal')($scope.capacidades[i].variables.d,3);
                $scope.capacidades[i].variables.l=$filter('setDecimal')($scope.capacidades[i].variables.l, 3);
                $scope.capacidades[i].variables.h=$filter('setDecimal')($scope.capacidades[i].variables.h, 3);
                $scope.capacidades[i].variables.b=$filter('setDecimal')($scope.capacidades[i].variables.b, 3);
                $scope.capacidades[i].variables.id=$filter('setDecimal')($scope.capacidades[i].variables.id, 3);
                $scope.capacidades[i].variables.idCasing=$filter('setDecimal')($scope.capacidades[i].variables.idCasing,3);
                $scope.capacidades[i].variables.odTubing=$filter('setDecimal')($scope.capacidades[i].variables.odTubing, 3);

            }





        });
        $scope.$watch('medidas[1].seleccionado', function(newValues, oldValues,$scope) {
            $scope.unidadVolumenNew=newValues;
            $scope.unidadVolumenOld=oldValues;

            for(var i=0; i<$scope.capacidades.length;i++)
            {
                $scope.capacidades[i].variables.volumen=Medidas.transformarIda($scope.capacidades[i].variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen');
                $scope.capacidades[i].variables.volumenAnular=Medidas.transformarIda($scope.capacidades[i].variables.volumenAnular, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen');
                $scope.capacidades[i].variables.volumen=$filter('setDecimal')($scope.capacidades[i].variables.volumen,3);
                $scope.capacidades[i].variables.volumenAnular=$filter('setDecimal')($scope.capacidades[i].variables.volumenAnular,3);
            }



        });
        $scope.calcular = function (capacidadID,idUnidadLongitud,idUnidadVolumen, anterior) {

            if($scope.capacidad.variables.h>$scope.capacidad.variables.l && $scope.capacidad.variables.l!= null)
                $scope.capacidad.variables.h=$scope.capacidad.variables.l

            var d= Medidas.transformarBase($scope.capacidad.variables.d,idUnidadLongitud,'longitud');
            var l=Medidas.transformarBase($scope.capacidad.variables.l,idUnidadLongitud,'longitud');
            var h=Medidas.transformarBase($scope.capacidad.variables.h,idUnidadLongitud,'longitud');
            var volumen=Medidas.transformarBase($scope.capacidad.variables.volumen,idUnidadVolumen,'volumen');
            var capacidad=Medidas.transformarBase($scope.capacidad.variables.capacidad,idUnidadLongitud,'longitud');
            var b=Medidas.transformarBase($scope.capacidad.variables.b,idUnidadLongitud,'longitud');
            var  id=Medidas.transformarBase($scope.capacidad.variables.id,idUnidadLongitud,'longitud');
            var idCasing=Medidas.transformarBase($scope.capacidad.variables.idCasing,idUnidadLongitud,'longitud');
            var odTubing=Medidas.transformarBase($scope.capacidad.variables.odTubing,idUnidadLongitud,'longitud');
            var  volumenAnular=Medidas.transformarBase($scope.capacidad.variables.volumenAnular,idUnidadVolumen,'volumen');

            switch (capacidadID){

                case 0:{

                    $scope.capacidad.variables.volumen=Medidas.transformarBase(((Math.PI * Math.pow(d,2)*h)/(4*(5.61458284))),idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);

                    $scope.capacidad.variables.capacidad=$filter('setDecimal')((h*100)/(l),3);
                    break;
                }
                case 1:{

                    var a;
                    var y;
                    var angulo;
                    var aocupada;
                    var aseleccion;
                    var vtotal;
                    var vtotalOcup


                    if(h>(d/2))
                    a=(h-(d/2));
                    else
                    a=((d/2)-h);

                    y= 2* Math.sqrt((Math.pow(d,2)/4)-(Math.pow(a,2)));

                    angulo= (Math.asin(y/d)*2*180)/Math.PI;

                    aocupada=((Math.PI*Math.pow(d,2))/4)-(Math.pow(d,2)/8)*(Math.PI *angulo/180-Math.sin((angulo*Math.PI)/180));
                    aseleccion =(Math.pow(d,2)/8)*(Math.PI*angulo/180-Math.sin((angulo*Math.PI)/180));
                    vtotal= Math.PI*Math.pow(d,2)*l/4;

                    if((d/2)<h)
                    vtotalOcup= aocupada*l;
                    else
                    vtotalOcup=aseleccion*l;


                    $scope.capacidad.variables.volumen=Medidas.transformarBase((vtotalOcup/5.61458284),idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);

                    $scope.capacidad.variables.capacidad=$filter('setDecimal')(((vtotalOcup*100)/vtotal),3);

                    break;
                }
                case 2:{

                    function VolTanEliHor( D, L, r, y){
                        var volumen;

                        if (y > D)
                        {
                            y = D;
                        }
                     
                        var R = D / 2;

                        if( y == 0){
                            volumen = 0;
                        }
                        else{
                            volumen = (3*Math.PI*L*Math.pow(R,3) + 3*Math.PI*R*r*Math.pow(y,2) - Math.PI*r*Math.pow(y,3) -6*L*Math.pow(R,3)*Math.atan(Math.sqrt(2*R-y)/Math.sqrt(y)) - 3*Math.sqrt(2*R-y)*(L*Math.pow(R,2) - L*R*y)*Math.sqrt(y))/(3*R);
                        }                                           

                        return Medidas.transformarIda(volumen,0,1,'volumen');
                    } 


                   var vol_tot = VolTanEliHor(d,l,b,d)
                    var vol_par_hor = VolTanEliHor(d,l,b,h)
                    if (vol_tot != 0)
                    $scope.capacidad.variables.capacidad =$filter('setDecimal')( vol_par_hor / vol_tot * 100,3);
                    else
                    $scope.capacidad.variables.capacidad=0; 

                    $scope.capacidad.variables.volumen=Medidas.transformarBase(vol_par_hor,idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);

                    break;



                }
                case 3:{

                    function VolTanEliVer(D,L,r,y){

                        var volumen;
                        var alt_tot = 2*r + L;
                        if (y > alt_tot)
                            y = alt_tot;

                        var R = D/2;

                        if(r == 0) {
                            volumen = Math.PI * Math.pow(R,2) * y;
                            return Medidas.transformarIda(volumen,0,1,'volumen');                        }


                        var vol_esf = Math.PI * Math.pow(R,2) *Math.pow(r,2)* (3*r - r) / (3* Math.pow(r,2));
                        if (y <= r)
                            volumen = Math.PI *Math.pow(R,2) * Math.pow(y,2)* (3*r - y) / (3* Math.pow(r,2));
                        else if(r < y && y <= r + L) {
                            vol_cil = Math.PI * Math.pow(R, 2) * (y - r);
                            volumen = vol_esf + vol_cil;
                        }
                        else if (r + L < y && y <= alt_tot) {
                            pro_top = 2 * r + L - y;
                            vol_par = Math.PI * Math.pow(R, 2) * Math.pow(pro_top, 2) * (3 * r - pro_top) / (3 * Math.pow(r,2));
                            vol_par_esf = vol_esf - vol_par;
                            volumen = vol_esf + Math.PI * Math.pow(R, 2) * L + vol_par_esf;
                        }

                        return Medidas.transformarIda(volumen,0,1,'volumen');

                    }

                    var vol_tot = VolTanEliVer(d, l, b, (2*b + l))
                    var vol_par_ver = VolTanEliVer(d, l, b, h)
                    if (vol_tot != 0)
                        $scope.capacidad.variables.capacidad = vol_par_ver / vol_tot * 100;
                    else
                        $scope.capacidad.variables.capacidad=0;

                    $scope.capacidad.variables.volumen=Medidas.transformarBase(vol_par_ver,idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);


                    break;

                }
                case 4:{

                    $scope.capacidad.variables.volumen=Medidas.transformarBase(((Math.PI * Math.pow(id,2)*h)/(144*4*(5.61458284))),idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);

                    $scope.capacidad.variables.capacidad=(h*100)/(l);

                    break;
                }
                case 5:{


                    $scope.capacidad.variables.volumenAnular=Medidas.transformarBase(((Math.PI * (Math.pow(idCasing,2)-Math.pow(odTubing,2))*l)/(144*4*(5.61458284))),idUnidadVolumen,'volumen');
                    $scope.capacidad.variables.volumen=$filter('setDecimal')(Medidas.transformarIda($scope.capacidad.variables.volumen, $scope.unidadVolumenNew,$scope.unidadVolumenOld,'volumen'),3);

                    break;

                }

            }

        }


    })
    .controller('MedidaUnitsCtlr', function ($scope, $stateParams, Medidas,$filter) {
        $scope.medida = Medidas.get($stateParams.medidaID);
        $scope.borrar= function(){

            for(var i= 0; i < $scope.medida.unidades.length; i++)
            {
                $scope.medida.unidades[i].value=null;
            }
        }
        $scope.transformar = function (unidadModificada) {
            var self2 = this;

            var value = this.$eval('unidad.value');

            var value = eval(this.medida.unidades[unidadModificada.id].formulaVuelta);

            for (index in this.medida.unidades) {
                var unidad = this.medida.unidades[index];

                if (unidad != unidadModificada && value != null) {
                    unidad.value =  $filter('setDecimal')(eval(unidad.formula),3);
                }
                if (unidad != unidadModificada && (value == null || value <= 0))
                    unidad.value = 0;


            }
        }
    })
    .controller('CasingTubingCtrl', function ($scope, $stateParams, CasingTubing , $ionicModal) {

        $scope.opcionTuberia = CasingTubing.all();

        $scope.casingAPI=CasingTubing.allcasingAPI();
        $scope.casingTAMSA=CasingTubing.allcasingTAMSA();
        $scope.tubingAPI=CasingTubing.alltubingAPI();
        $scope.tubingTAMSA=CasingTubing.alltubingTAMSA();

        $scope.dbcasingAPI = TAFFY($scope.casingAPI);
        $scope.dbcasingTAMSA = TAFFY($scope.casingTAMSA);
        $scope.dbtubingAPI = TAFFY($scope.tubingAPI);
        $scope.dbtubingTAMSA = TAFFY($scope.tubingTAMSA);


        $scope.tuberiaSeleccionada= 0;
        $scope.tipotuberia= 1;
        $scope.dexterno=$scope.dbcasingAPI().distinct("nod");
        $scope.peso= null;
        $scope.grado=null;
        $scope.nid=null;
        $scope.seldexterno=null;
        $scope.selpeso= null;
        $scope.selgrado=null;
        $scope.drift=null;
        $scope.resist=null;
        $scope.yield=null;
        $scope.volumen=null;


        $scope.setCombos= function(tuberiaSeleccionada,tipotuberia,dexterno,peso,grado)
        {

            if (tuberiaSeleccionada == 0 && tipotuberia == 0)
                var base = $scope.dbcasingTAMSA;
            if (tuberiaSeleccionada == 0 && tipotuberia == 1)
                var base = $scope.dbcasingAPI;

            if (tuberiaSeleccionada == 1 && tipotuberia == 0)
                var base = $scope.dbtubingTAMSA;
            if (tuberiaSeleccionada == 1 && tipotuberia == 1)
                var base = $scope.dbtubingAPI;

            $scope.dexterno=base().distinct("nod")
            $scope.peso= base({nod:dexterno}).distinct("peso");
            $scope.grado=base({nod:dexterno},{peso:peso}).distinct("grado");


            var item=base({nod:dexterno},{peso:peso},{grado:grado}).get()[0];

            if(item==undefined)
            {
                $scope.nid=null;
                $scope.drift=null;
                $scope.resist=null;
                $scope.yield=null;
                $scope.volumen=null;


            }
            $scope.nid=item.nid;
            $scope.drift=item.drift;
            $scope.resist=item.resist;
            $scope.yield=item.yield;
            $scope.volumen=item.volumen;

        }





    })
    .controller('Iprtrl', function ($scope ,Ipr ) {
        $scope.iprs = Ipr.all();
    })
    .controller('IprCalculostrl', function ($scope ,$stateParams,Ipr,Medidas,MedidasExt,$ionicModal,$filter ) {
        $scope.medidas = Medidas.all();
        $scope.medidasExt = MedidasExt.all();
        $scope.iprs = Ipr.all();
        $scope.ipr = Ipr.get($stateParams.iprsID);
        $scope.unidadCaudalNew=null;
        $scope.unidadCaudalOld= null;
        $scope.unidadPresionNew=null;
        $scope.unidadPresionOld=null;
        $scope.unidadIPNew=null;
        $scope.unidadIPOld=null;
        $scope.habilitado=false;

        $scope.borrar= function(){

            $scope.ipr.variables.pr=0;
            $scope.ipr.variables.pb=0;
            $scope.ipr.variables.pwf=0;
            $scope.ipr.variables.caudal=0;
            $scope.ipr.variables.corteagu=0;
            $scope.ipr.variables.ipfluido=0;
            $scope.ipr.variables.qfluido=0;
            $scope.ipr.variables.ippetroleo=0;
            $scope.ipr.variables.qpetroleo=0;

        }

        $scope.$watch('medidas[0].seleccionado', function(newValues, oldValues,$scope) {
            $scope.unidadPresionNew=newValues;
            $scope.unidadPresionOld=oldValues;

            for(var i =0; i< ($scope.iprs).length; i++) {
                $scope.iprs[i].variables.pr = Medidas.transformarIda($scope.iprs[i].variables.pr, $scope.unidadPresionNew, $scope.unidadPresionOld, 'presion');
                $scope.iprs[i].variables.pwf = Medidas.transformarIda($scope.iprs[i].variables.pwf, $scope.unidadPresionNew, $scope.unidadPresionOld, 'presion');
                $scope.iprs[i].variables.pr = $filter('setDecimal')($scope.iprs[i].variables.pr, 3);
                $scope.iprs[i].variables.pwf = $filter('setDecimal')($scope.iprs[i].variables.pwf, 3);
            }
        });

        $scope.$watch('medidas[3].seleccionado', function(newValues, oldValues,$scope) {
            $scope.unidadCaudalNew=newValues;
            $scope.unidadCaudalOld=oldValues;
            for(var i =0; i< ($scope.iprs).length; i++) {
                $scope.iprs[i].variables.caudal = Medidas.transformarIda($scope.iprs[i].variables.caudal, $scope.unidadCaudalNew, $scope.unidadCaudalOld, 'caudal');
                $scope.iprs[i].variables.qfluido = Medidas.transformarIda($scope.iprs[i].variables.qfluido, $scope.unidadCaudalNew, $scope.unidadCaudalOld, 'caudal');
                $scope.iprs[i].variables.qpetroleo = Medidas.transformarIda($scope.iprs[i].variables.qpetroleo, $scope.unidadCaudalNew, $scope.unidadCaudalOld, 'caudal');

                $scope.iprs[i].variables.caudal = $filter('setDecimal')($scope.iprs[i].variables.caudal, 3);
                $scope.iprs[i].variables.qfluido = $filter('setDecimal')($scope.iprs[i].variables.qfluido, 3);
                $scope.iprs[i].variables.qpetroleo = $filter('setDecimal')($scope.iprs[i].variables.qpetroleo, 3);
            }
        });

        $scope.$watch('medidasExt[0].seleccionado', function(newValues, oldValues,$scope) { 
            $scope.unidadIPNew=newValues;
            $scope.unidadIPOld=oldValues;

            for(var i =0; i< ($scope.iprs).length; i++) {

                $scope.iprs[i].variables.ipfluido = MedidasExt.transformarIda($scope.iprs[i].variables.ipfluido, $scope.unidadIPNew, $scope.unidadIPOld, 'ip');
                $scope.iprs[i].variables.ippetroleo = MedidasExt.transformarIda($scope.iprs[i].variables.ippetroleo, $scope.unidadIPNew, $scope.unidadIPOld, 'ip');

                $scope.iprs[i].variables.ipfluido = $filter('setDecimal')($scope.iprs[i].variables.ipfluido, 3);
                $scope.iprs[i].variables.ippetroleo = $filter('setDecimal')($scope.iprs[i].variables.ippetroleo, 3);
            }

        });



        $scope.calcular = function (iprID,idUnidadPresion,idUnidadCaudal,idUnidadIP) {

           var pre_res = Medidas.transformarBase($scope.ipr.variables.pr, idUnidadPresion, 'presion');
            var Pb = Medidas.transformarBase($scope.ipr.variables.pb, idUnidadPresion, 'presion');
            var pre_ffl_tst = Medidas.transformarBase($scope.ipr.variables.pwf, idUnidadPresion, 'presion');
            var cau_tst = Medidas.transformarBase($scope.ipr.variables.caudal, idUnidadCaudal, 'caudal');
            var bsw =$scope.ipr.variables.corteagua;
            var IP_flu = MedidasExt.transformarBase($scope.ipr.variables.ipfluido, idUnidadIP, 'ip');
            var Qmax_flu = Medidas.transformarBase($scope.ipr.variables.qfluido, idUnidadIP, 'caudal');
            var IP_oil = MedidasExt.transformarBase($scope.ipr.variables.ippetroleo, idUnidadIP, 'ip');
            var Qmax_oil = Medidas.transformarBase($scope.ipr.variables.qpetroleo, idUnidadIP, 'caudal');


            function ip_flu_lin(cau_tst, pre_res, pre_ffl_tst){
                return cau_tst / (pre_res - pre_ffl_tst);
            }
            function ip_flu_vog(cau_tst, pre_res, pre_ffl_tst){
                return 1.8 * cau_tst / (pre_res * (1 - 0.2*(pre_ffl_tst/pre_res) - 0.8 * Math.pow((pre_ffl_tst/pre_res),2)))
            }

            function cal_cau_lin(ip, pre_res, pwf){
                return ip * (pre_res - pwf)
            }
            function cal_cau_vog(pre_res, pwf, qmax_flu){
                return qmax_flu * (1 - 0.2 * (pwf / pre_res) - 0.8 * Math.pow((pwf / pre_res),2));
            }

            function cau_max_vog(pre_res, pwf, caudal){
                return caudal / (1 - 0.2 * (pwf / pre_res) - 0.8 * Math.pow((pwf / pre_res),2))
            }


           var Qw = cau_tst * bsw / 100.0;
           var  Qo = cau_tst - Qw;




            switch (iprID) {

                case 0: {


                    IP_flu = ip_flu_lin(cau_tst, pre_res, pre_ffl_tst);
                    Qmax_flu =cal_cau_lin( $scope.ipr.variables.ipfluido, pre_res, 0);
                    IP_oil = ip_flu_lin(Qo, pre_res, pre_ffl_tst);
                    Qmax_oil =cal_cau_lin($scope.ipr.variables.ippetroleo, pre_res, 0)

                    $scope.ipr.variables.ipfluido = IP_flu;
                    $scope.ipr.variables.qfluido= Qmax_flu;
                    $scope.ipr.variables.ippetroleo = IP_oil;
                    $scope.ipr.variables.qpetroleo = Qmax_oil;

                    $scope.ipr.variables.ipfluido=MedidasExt.transformarIda($scope.ipr.variables.ipfluido, $scope.unidadIPNew,$scope.unidadIPOld,'ip');
                    $scope.ipr.variables.ippetroleo=MedidasExt.transformarIda($scope.ipr.variables.ippetroleo, $scope.unidadIPNew,$scope.unidadIPOld,'ip');
                    $scope.ipr.variables.qfluido=Medidas.transformarIda($scope.ipr.variables.qfluido, $scope.unidadCaudalNew,$scope.unidadCaudalOld,'caudal');
                    $scope.ipr.variables.qpetroleo=Medidas.transformarIda($scope.ipr.variables.qpetroleo, $scope.unidadCaudalNew,$scope.unidadCaudalOld,'caudal');



                    $scope.ipr.variables.ipfluido=$filter('setDecimal')($scope.ipr.variables.ipfluido, 3);
                    $scope.ipr.variables.ippetroleo=$filter('setDecimal')($scope.ipr.variables.ippetroleo, 3);
                    $scope.ipr.variables.qfluido=$filter('setDecimal')($scope.ipr.variables.qfluido,3);
                    $scope.ipr.variables.qpetroleo=$filter('setDecimal')($scope.ipr.variables.qpetroleo,3);
                    break;
                }
                case 1:{


                        IP_flu = ip_flu_vog(cau_tst, pre_res, pre_ffl_tst);
                        Qmax_flu =cau_max_vog(pre_res, pre_ffl_tst, cau_tst);
                        IP_oil = ip_flu_vog(Qo, pre_res, pre_ffl_tst);
                        Qmax_oil =cau_max_vog(pre_res,pre_ffl_tst, Qo);

                        $scope.ipr.variables.ipfluido = IP_flu;
                        $scope.ipr.variables.qfluido= Qmax_flu;
                        $scope.ipr.variables.ippetroleo = IP_oil;
                        $scope.ipr.variables.qpetroleo = Qmax_oil;

                        $scope.ipr.variables.ipfluido=MedidasExt.transformarIda($scope.ipr.variables.ipfluido, $scope.unidadIPNew,$scope.unidadIPOld,'ip');
                        $scope.ipr.variables.ippetroleo=MedidasExt.transformarIda($scope.ipr.variables.ippetroleo, $scope.unidadIPNew,$scope.unidadIPOld,'ip');
                        $scope.ipr.variables.qfluido=Medidas.transformarIda($scope.ipr.variables.qfluido, $scope.unidadCaudalNew,$scope.unidadCaudalOld,'caudal');
                        $scope.ipr.variables.qpetroleo=Medidas.transformarIda($scope.ipr.variables.qpetroleo, $scope.unidadCaudalNew,$scope.unidadCaudalOld,'caudal');



                    $scope.ipr.variables.ipfluido=$filter('setDecimal')($scope.ipr.variables.ipfluido, 3);
                    $scope.ipr.variables.ippetroleo=$filter('setDecimal')($scope.ipr.variables.ippetroleo, 3);
                    $scope.ipr.variables.qfluido=$filter('setDecimal')($scope.ipr.variables.qfluido,3);
                    $scope.ipr.variables.qpetroleo=$filter('setDecimal')($scope.ipr.variables.qpetroleo,3);
                    break;

                }
                case 2:
                {
                    var Q_flu_pb = 0;
                    var Q_oil_pb = 0;


                    if (pre_res > Pb) {
                        if (pre_ffl_tst > Pb) {
                            IP_flu = ip_flu_lin(cau_tst, pre_res, pre_ffl_tst)
                            IP_oil = ip_flu_lin(Qo, pre_res, pre_ffl_tst)
                        }
                        else
                            {
                                IP_flu = cau_tst / (pre_res - Pb + Pb / 1.8 * (1 - 0.2 * (pre_ffl_tst / Pb) - 0.8 * Math.pow((pre_ffl_tst / Pb), 2)))
                                IP_oil = Qo / (pre_res - Pb + Pb / 1.8 * (1 - 0.2 * (pre_ffl_tst / Pb) - 0.8 * Math.pow((pre_ffl_tst / Pb), 2)));
                            }
                        }
                        else {
                        IP_flu = ip_flu_vog(cau_tst, pre_res, pre_ffl_tst)
                        IP_oil = ip_flu_vog(Qo, pre_res, pre_ffl_tst)
                    } 
                            if (pre_res > Pb) {
                                Q_flu_pb = cal_cau_lin(IP_flu, pre_res, Pb)
                                Q_oil_pb = cal_cau_lin(IP_oil, pre_res, Pb)
                                Qmax_flu = Q_flu_pb + IP_flu * Pb / 1.8
                                Qmax_oil = Q_oil_pb + IP_oil * Pb / 1.8
                            }
                            else {

                                Qmax_flu = cau_max_vog(pre_res, pre_ffl_tst, cau_tst)
                                Qmax_oil = cau_max_vog(pre_res, pre_ffl_tst, Qo)
                            }


                        $scope.ipr.variables.ipfluido = IP_flu;
                        $scope.ipr.variables.qfluido = Qmax_flu;
                        $scope.ipr.variables.ippetroleo = IP_oil;
                        $scope.ipr.variables.qpetroleo = Qmax_oil;

                        $scope.ipr.variables.ipfluido = MedidasExt.transformarIda($scope.ipr.variables.ipfluido, $scope.unidadIPNew, $scope.unidadIPOld, 'ip');
                        $scope.ipr.variables.ippetroleo = MedidasExt.transformarIda($scope.ipr.variables.ippetroleo, $scope.unidadIPNew, $scope.unidadIPOld, 'ip');
                        $scope.ipr.variables.qfluido = Medidas.transformarIda($scope.ipr.variables.qfluido, $scope.unidadCaudalNew, $scope.unidadCaudalOld, 'caudal');
                        $scope.ipr.variables.qpetroleo = Medidas.transformarIda($scope.ipr.variables.qpetroleo, $scope.unidadCaudalNew, $scope.unidadCaudalOld, 'caudal');



                    $scope.ipr.variables.ipfluido=$filter('setDecimal')($scope.ipr.variables.ipfluido, 3);
                    $scope.ipr.variables.ippetroleo=$filter('setDecimal')($scope.ipr.variables.ippetroleo, 3);
                    $scope.ipr.variables.qfluido=$filter('setDecimal')($scope.ipr.variables.qfluido,3);
                    $scope.ipr.variables.qpetroleo=$filter('setDecimal')($scope.ipr.variables.qpetroleo,3);
                    break;

                }
                }


            }

        $scope.graficar=function(iprID,idUnidadPresion,idUnidadCaudal,idUnidadIP){

            var pre_res = Medidas.transformarBase($scope.ipr.variables.pr, idUnidadPresion, 'presion');
            var Pb = Medidas.transformarBase($scope.ipr.variables.pb, idUnidadPresion, 'presion');
            var pre_ffl_tst = Medidas.transformarBase($scope.ipr.variables.pwf, idUnidadPresion, 'presion');
            var cau_tst = Medidas.transformarBase($scope.ipr.variables.caudal, idUnidadCaudal, 'caudal');
            var bsw =$scope.ipr.variables.corteagua, idUnidadCaudal
            var IP_flu = MedidasExt.transformarBase($scope.ipr.variables.ipfluido, idUnidadIP, 'ip');
            var Qmax_flu = Medidas.transformarBase($scope.ipr.variables.qfluido, idUnidadIP, 'caudal');
            var IP_oil = MedidasExt.transformarBase($scope.ipr.variables.ippetroleo, idUnidadIP, 'ip');
            var Qmax_oil = Medidas.transformarBase($scope.ipr.variables.qpetroleo, idUnidadIP, 'caudal');


            function ip_flu_lin(cau_tst, pre_res, pre_ffl_tst){
                return cau_tst / (pre_res - pre_ffl_tst);
            }
            function ip_flu_vog(cau_tst, pre_res, pre_ffl_tst){
                return 1.8 * cau_tst / (pre_res * (1 - 0.2*(pre_ffl_tst/pre_res) - 0.8 * Math.pow(pre_ffl_tst/pre_res,2)))
            }

            function cal_cau_lin(ip, pre_res, pwf){
                return ip * (pre_res - pwf)
            }
            function cal_cau_vog(pre_res, pwf, qmax_flu){
                return qmax_flu * (1 - 0.2 * (pwf / pre_res) - 0.8 * Math.pow((pwf / pre_res),2));
            }

            function cau_max_vog(pre_res, pwf, caudal){
                return caudal / (1 - 0.2 * (pwf / pre_res) - 0.8 * Math.pow((pwf / pre_res),2))
            }

            function cau_max_vog(ip, pre_res, caudal){
                return pre_res - caudal / ip
            }

            function cal_pwf_lin(ip, pre_res, caudal)
            {
                return pre_res - caudal / ip;
            }

            function cal_pwf_vog(pre_res, caudal, qmax_flu){

                return pre_res * (-0.2 + Math.pow((Math.pow(0.2,2) - 4 * 0.8 * (caudal / qmax_flu - 1)),0.5))/(2 * 0.8);

            }




            var Qw = cau_tst * bsw / 100.0;
            var  Qo = cau_tst - Qw;




            switch (iprID) {

                case 0: {

                    var arrFluido=[];
                    var arrOil=[];

                    for(var i=0; i<=Qmax_oil; i+=(Qmax_oil/1000))
                    {
                        var punto=[];

                        punto[0]=i;
                        if($scope.unidadPresionNew!=0)
                        punto[1]=Medidas.transformarIda(cal_pwf_lin(IP_oil,pre_res,Medidas.transformarBase(i, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                        else
                            punto[1]= cal_pwf_lin(IP_oil,pre_res,Medidas.transformarBase(i, idUnidadCaudal, 'caudal'));

                        arrOil.push(punto);

                    }

                    for(var i=0; i<= Qmax_flu; i+=(Qmax_flu/1000))
                    {
                        var punto=[];

                        punto[0]=i
                        if($scope.unidadPresionNew!=0)
                            punto[1]=Medidas.transformarIda(cal_pwf_lin(IP_flu,pre_res,Medidas.transformarBase(i, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                        else
                            punto[1]= cal_pwf_lin(IP_flu,pre_res,Medidas.transformarBase(i, idUnidadCaudal, 'caudal'));

                        arrFluido.push(punto);

                    }

                    $scope.chartConfig = {

                        chart: {
                            renderTo: 'Chart',
                            type: 'spline',
                            zoomType: 'x', // puede ser xy
                            marginRight: 130
                        },

                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    symbol: 'circle',
                                    radius: 1.5
                                }
                            }
                        },
                        title: {
                            text: "Gráfica IPR"+" "+ $scope.ipr.name
                        },
                        xAxis: {
                            title: {
                                text:'Caudal ('+$scope.medidas[3].unidades[idUnidadCaudal].name +') '
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text:'Presión ('+$scope.medidas[0].unidades[idUnidadPresion].name +') '
                            }
                        },
                        credits: {
                            enabled: true, //Créditos del gráfico
                            style: {
                                color: '#359536',
                                fontSize: '10px'
                            },
                            text: "Syal",
                            href: 'http://www.sertecpet.com.ec'
                        },


                        series : [{
                            name : 'IPR Fluido',
                            data : arrFluido,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                            {
                                name : 'IPR Petroleo',
                                data : arrOil,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }]

                    }

                    break;
                }
                case 1:{

                    var arrFluido=[];
                    var arrOil=[];

                    for(var i=0; i<= Qmax_oil; i+= (Qmax_oil/1000))
                    {
                        var punto=[];

                        punto[0]=i;
                        if($scope.unidadPresionNew!=0)
                        punto[1]=Medidas.transformarIda(cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                        else
                        punto[1]=cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal'));
                        arrOil.push(punto);

                    }

                    for(var i=0; i<= Qmax_flu; i+= (Qmax_flu/1000))
                    {
                        var punto=[];

                        punto[0]=i;
                        if($scope.unidadPresionNew!=0)
                        punto[1]=Medidas.transformarIda(cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_flu, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');

                        else
                        punto[1]=cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_flu, idUnidadCaudal, 'caudal'));

                        arrFluido.push(punto);

                    }

                    $scope.chartConfig = {

                        chart: {
                            renderTo: 'Chart',
                            type: 'spline',
                            zoomType: 'x', // puede ser xy
                            marginRight: 130
                        },

                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    symbol: 'circle',
                                    radius: 1.5
                                }
                            }
                        },
                        title: {
                            text: "Gráfica IPR"+" "+ $scope.ipr.name
                        },
                        xAxis: {
                            title: {
                                text:'Caudal ('+$scope.medidas[3].unidades[idUnidadCaudal].name +') '
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text:'Presión ('+$scope.medidas[0].unidades[idUnidadPresion].name +') '
                            }
                        },
                        credits: {
                            enabled: true, //Créditos del gráfico
                            style: {
                                color: '#359536',
                                fontSize: '10px'
                            },
                            text: "Syal",
                            href: 'http://www.sertecpet.com.ec'
                        },


                        series : [{
                            name : 'IPR Fluido',
                            data : arrFluido,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                            {
                                name : 'IPR Petroleo',
                                data : arrOil,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }]

                    }


                    break;



                }
                case 2:
                {


                    var arrFluido=[];
                    var arrOil=[];

                    var ind_sel;

                    var caudal_pb=cal_cau_lin(IP_flu,pre_res,Pb);

                    for(var i=0; i<= Qmax_oil; i+= (Qmax_oil/1000))
                    {
                        var punto=[];

                        punto[0]=i;


                        if(i< caudal_pb )
                            if($scope.unidadPresionNew!=0)
                                punto[1]=Medidas.transformarIda(cal_pwf_lin(IP_oil,pre_res,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                            else
                                punto[1]=cal_pwf_lin(IP_oil,pre_res,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal'));
                        else
                            if($scope.unidadPresionNew!=0)
                            punto[1]=Medidas.transformarIda(cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                            else
                            punto[1]=cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal'));
                        arrOil.push(punto);

                    }

                    for(var i=0; i<= Qmax_oil; i+= (Qmax_flu/1000))
                    {
                        var punto=[];

                        punto[0]=i;
                        if(i< caudal_pb )
                            if($scope.unidadPresionNew!=0)
                                punto[1]=Medidas.transformarIda(cal_pwf_lin(IP_flu,pre_res,Medidas.transformarBase(Qmax_flu, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                            else
                                punto[1]=cal_pwf_lin(IP_oil,pre_res,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal'));
                        else
                        if($scope.unidadPresionNew!=0)
                            punto[1]=Medidas.transformarIda(cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_flu, idUnidadCaudal, 'caudal')),$scope.unidadPresionNew,$scope.unidadPresionOld,'presion');
                        else
                            punto[1]=cal_pwf_vog(pre_res,i,Medidas.transformarBase(Qmax_oil, idUnidadCaudal, 'caudal'));
                        arrFluido.push(punto);

                    }


                    $scope.chartConfig = {

                        chart: {
                            renderTo: 'Chart',
                            type: 'spline',
                            zoomType: 'x', // puede ser xy
                            marginRight: 130
                        },

                        plotOptions: {
                            series: {
                                marker: {
                                    enabled: true,
                                    symbol: 'circle',
                                    radius: 1.5
                                }
                            }
                        },
                        title: {
                            text: "Gráfica IPR"+" "+ $scope.ipr.name
                        },
                        xAxis: {
                            title: {
                                text:'Caudal ('+$scope.medidas[3].unidades[idUnidadCaudal].name +') '
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text:'Presión ('+$scope.medidas[0].unidades[idUnidadPresion].name +') '
                            }
                        },
                        credits: {
                            enabled: false, //Créditos del gráfico
                            style: {
                                color: '#359536',
                                fontSize: '10px'
                            },
                            text: "Syal",
                            href: 'http://www.sertecpet.com.ec'
                        },


                        series : [{
                            name : 'IPR Fluido',
                            data : arrFluido,
                            tooltip: {
                                valueDecimals: 2
                            }
                        },
                            {
                                name : 'IPR Petroleo',
                                data : arrOil,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }]

                    }
                    break;


                }
            }


        }


        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.grafica=$scope.ipr.grafico;
        });
        $scope.openModal = function() {

            $scope.modal.show();

        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });







    })
    .controller('AppCtrl', function($scope, $ionicModal) {



        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();

        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

})
    .controller("HerramientasCtrl", function($scope, $ionicSlideBoxDelegate, Herramientas) {

        $scope.herramientas = Herramientas.all();

    })
    .controller("HerramientaCtrl", function($scope,$stateParams, Herramientas,$ionicModal) {

        $scope.herramienta = Herramientas.get($stateParams.herramientaID);

        $ionicModal.fromTemplateUrl('templates/modal-herramienta.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();

        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });


       
    })
    .controller('ModalCtrl', function($scope, $ionicModal) {

    });