<form name="outerForm" class="container">
    <!--64b2f1a7b6dd5af24db7-->
    <!--Search Filter Bar-->
    <div>
        <div class="col-md-3">&nbsp;</div>
        <div class="col-md-6" ng-if="filterLoading === false">
            <div class="input-group text-right">
                <input type="text" class="form-control" placeholder="Search">
                <div class="input-group-btn">
                    <button class="btn btn-primary" type="submit" title="Enter text and filter" ng-click="seach('')"></button>
                    <button class="btn btn-info" type="submit" title="Reset Search" ng-click="refreshSearch()"></button>
                </div>
            </div>
        </div>
    </div>
    <uib-tabset active="active">

        <!--Non-Binary Tab-->
        <uib-tab id="tabset0" index="0" heading="Non-Binary" ng-click="loadTab(0);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="nonbinaryDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Girl Tab-->
        <uib-tab id="tabset1" index="1" heading="Girl" ng-click="loadTab(1);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="girlDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Boy Tab-->
        <uib-tab id="tabset2" index="2" heading="Boy" ng-click="loadTab(2);">
        <div class="container">
        <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
        <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
        <div class="col-md-6 center block" ng-if="dataLoading === true">
            <h3>Loading Info...</h3>
            <div class="progress" margin-left:auto; margin-right:auto>
                <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
            </div>
        </div>
        <div class="col-md-3" ng-if="boyDataLoading === true">&nbsp;</div>

        </div>
        </uib-tab>
        <!--Agender Tab-->
        <uib-tab id="tabset3" index="3" heading="Agender" ng-click="loadTab(3);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="agenderDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Transgender Tab-->
        <uib-tab id="tabset4" index="4" heading="Transgender" ng-click="loadTab(4);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="transgenderDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Gender fluid Tab-->
        <uib-tab id="tabset5" index="5" heading="Gender fluid" ng-click="loadTab(5);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="genderfluidDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Cisgender Tab-->
        <uib-tab id="tabset6" index="6" heading="Cisgender" ng-click="loadTab(6);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="cisgenderDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Two-Spirit Tab-->
        <uib-tab id="tabset7" index="7" heading="Two-Spirit" ng-click="loadTab(7);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="twospiritDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
        <!--Gender neutral Tab-->
        <uib-tab id="tabset8" index="8" heading="Gender Neutral" ng-click="loadTab(8);">
            <div class="container">
                <span us-spinner="{radius:30, width:8, length:16}" spinner-key="spinner-1"></span>
                <div class="col-md-3" ng-if="dataLoading === true">&nbsp;</div>
                <div class="col-md-6 center block" ng-if="dataLoading === true">
                    <h3>Loading Info...</h3>
                    <div class="progress" margin-left:auto; margin-right:auto>
                        <div class="progress-bar progress-bar-striped active" role="progressbar"></div>
                    </div>
                </div>
                <div class="col-md-3" ng-if="genderneutralDataLoading === true">&nbsp;</div>

            </div>
        </uib-tab>
    </uib-tabset>
</form>
