# https://xray.cloud.xpand-it.com/api/v2/authenticate
# xray api doco
# https://docs.getxray.app/display/XRAYCLOUD/REST+API

# pass in the jira details when you call this
# e.g.

# -JiraProject PW -TestPlan PW-1779 -TestExecution PW-1780


param ($JiraProject, $TestPlan, $TestExecution)
Write-Host "Project: $JiraProject"
Write-Host "Test plan: $TestPlan"
Write-Host "Test execution: $TestExecution"
$configFilePath = $PSScriptRoot + "\results-rc3"


Write-Host "Uploading results from $configFilePath"
# this is for the token
$client_id = "E0C0A2B8805E47A7B35F749D9361F075" #"{client id}"
$client_secret = "e17918b4d3aa9124d7dc979ae25a76f40b2dbd668d66e30646258d42b6b1ae09" #"{client secret}"
$uri = "https://xray.cloud.getxray.app/api/v2/authenticate"

$Body = @{        
        'client_id' = $client_id        
        'client_secret' = $client_secret
}

$params = @{
    ContentType = 'application/json'
    #Headers = @{'accept'='application/json'}
    Body = ($Body | ConvertTo-Json)
    Method = 'Post'
    URI = $uri
}
# get the token
$response = Invoke-RestMethod @params
$token = $response
# output it if you want
# Write-Output $token
# Write-Host $token
# This sets a pipeline output variable
# Write-Host "##vso[task.setvariable variable=XrayToken;]$token"

# iterate over the folder of the test reports and grab the xml ones
# this will upload junit style reports
Get-ChildItem $configFilePath -Filter *.xml | 
Foreach-Object {
    # save the file because we are going to upload it in the body
    $content = Get-Content $_.FullName
    
    $params = @{
 
        ContentType = 'application/xml'
        Headers = @{Authorization = "Bearer $token"}
        Body = $content
        Method = 'Post'
        URI = "https://xray.cloud.getxray.app/api/v2/import/execution/junit?projectKey=$JiraProject&testPlanKey=$TestPlan"
    }    
    try {
        # upload to jira
        $response = Invoke-WebRequest -UseBasicParsing @params
        # this will 
        Write-Host $response
        # if the upload was successful say so
        if ($response.StatusCode -lt 300){
            Write-Host "Uploaded "$_.FullName
         }
         else {
            Write-Host $response.StatusCode
            Write-Host $response.StatusDescription
         }
    }
    catch {
        Write-Host -ForegroundColor:Red "Something went wrong"
        
        Write-Host $_.Exception.Response.StatusDescription
        Write-Host -BackgroundColor:Black -ForegroundColor:Red $_.Exception.Message
    }
    

}