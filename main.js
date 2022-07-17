 window.paginators = [];
                        //mount point for paginator
                        var paginatorFromElements = {

                            // item number per page
                            itemsPerpage:8,

                            //current page
                            currentPage:1,

                            //link to an elements we need to wrap in  paginator
                            elemsCSS:'',

                            //pagination container where pagination links will be placed
                            mountTo:'#tabcontent_0 .card-pg .pagination',




                            //link to self from window object
                            linkToSelf:'',

                            //take elements from  elemsCSS container and wraps them according to pagination settings
                            //prints pagination buttons
                            //высчитывает кол-во страниц и рисует пагинацию, монтирует все в mountTo
                            updateElements:function(){
                                //calculates number of pages later on
                                let pagecount = 0;

                                $(this.mountTo).empty();

                                $(this.elemsCSS).each((index, element)=>{

                                    //check if we jump to the next page
                                    if (Math.ceil((index+1)/this.itemsPerpage) > pagecount){
                                        //
                                        //in case we are now on selected page adds an active class to it
                                        //we need to add a pagination link to the pagination container
                                        if ((pagecount+1) == this.currentPage ) {
                                            $(this.mountTo).append("<li class=\"page-item\"><a class=\"page-link active\" onClick=\""+this.linkToSelf+".gotoPage("+(pagecount+1)+");\" aria-disabled=\"true\" >"+(pagecount+1)+"</a></li>");
                                        }else{
                                            $(this.mountTo).append("<li class=\"page-item\"><a class=\"page-link\" onClick=\""+this.linkToSelf+".gotoPage("+(pagecount+1)+");\" >"+(pagecount+1)+"</a></li>");
                                        }
                                        //increment page number
                                        pagecount++;
                                    }
                                    // hiding/unhiding necessary elements according to settings
                                    if (Math.ceil((index+1)/this.itemsPerpage) == this.currentPage ){
                                        $( element ).removeClass("d-none");
                                        $( element ).addClass("active");
                                        $( element ).addClass("show");
                                    }else{

                                        $( element ).addClass("d-none");
                                        $( element ).removeClass("active");
                                        $( element ).removeClass("show");

                                    }

                                });
                                //mount more button at the end of the pagination container
                                $(this.mountTo).append("<button class=\"btn btn-primary\" onclick=\""+this.linkToSelf+".more(2);\" style=\"margin-left:auto;\">еще</button>");
                            },

                            //jump to page with repainting navigation elements
                            gotoPage:function(num){
                                this.currentPage = num;
                                this.updateElements();
                                $("html, body").animate({ scrollTop: 200 }, 1000);
                            },

                            //more behavior
                            more:function (multiplier){
                                this.itemsPerpage = Math.round(this.itemsPerpage*multiplier);
                                this.currentPage = 1;
                                this.updateElements();
                                //$("html, body").animate({ scrollTop: 200 }, 1000);
                            },

                            //inits object

                            //itemsPerPage, elementsCSS, mountTo, linkToSelf
                            init:function (itemsPerPage, elementsCSS, mountTo, linkToSelf){
                               // console.log(this);
                                let copied = Object.assign({}, window.paginatorFromElements);
                                copied.itemsPerpage = 8;
                                copied.elemsCSS = elementsCSS;
                                copied.mountTo = mountTo;
                                copied.linkToSelf = linkToSelf;
                                //suppose we are using this inside DOMContentLoaded
                                let pages = 1;
                                copied.currentPage = 1;
                                //console.log(copied);
                                copied.updateElements(copied.elemsCSS, copied.mountTo);

                                return copied;

                            }

                        };

                        window.addEventListener('DOMContentLoaded', ()=>{
                            //console.log('#tabcontent_{{$key}} .row .card');
                            window.paginators[{{$key}}] = window.paginatorFromElements.init(
                                8,
                                '#tabcontent_{{$key}} .row .card',//css selector for all elems to have an affair with
                                '#tabcontent_{{$key}} .row .card-pg ul',
                                'window.paginators[{{$key}}]');//pagination container
                        });
