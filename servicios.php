<?php
set_time_limit(5000);
define("NETSUITE_URL", 'https://3559763.restlets.api.netsuite.com/app/site/hosting/restlet.nl');
define("NETSUITE_SCRIPT_ID", '1395');
define("NETSUITE_DEPLOY_ID", '1');
define("NETSUITE_ACCOUNT", '3559763');
define("NETSUITE_CONSUMER_KEY", 'b873d44cd8414ac6a74d9957a79eda43426c71904d9528a3f15cfdc614450f4c');
define("NETSUITE_CONSUMER_SECRET", '529a0628e3db12042a2ff4bb841e1a254ed5b137ae34df44d1793490c36f7aca');
define("NETSUITE_TOKEN_ID", 'f1b2b6a899641f7f20d2ebfa7a68158e170e68ae340f567f9d58003df39a2fdc');
define("NETSUITE_TOKEN_SECRET", '3cb19e46d1331042103847d9305605f32dd294830b4374b79e9aa831c25f2151');

$params = ('{
    "idCase": "12639818"
}');

$resultFinal = callRestlet($params);
$result = json_decode($resultFinal, true);

if($result !== "Error"){
    //$jsonResult = json_encode($resultFinal);
    print_r($resultFinal);
    //print($result);
    //print $resultFinal;
    //$obj = json_decode($result);
    //echo "Resultado: " .$obj;
}else{
    echo "Failed: " . $result;
}

function callRestlet($param) {
    $data_string = json_encode($param);
    //echo $data_string;
    $oauth_nonce = md5(mt_rand());
    $oauth_timestamp = time();
    $oauth_signature_method = 'HMAC-SHA1';
    $oauth_version = "1.0";

    $base_string =
        "POST&" . urlencode(NETSUITE_URL) . "&" .
        urlencode(
            "deploy=" . NETSUITE_DEPLOY_ID
          . "&oauth_consumer_key=" . NETSUITE_CONSUMER_KEY
          . "&oauth_nonce=" . $oauth_nonce
          . "&oauth_signature_method=" . $oauth_signature_method
          . "&oauth_timestamp=" . $oauth_timestamp
          . "&oauth_token=" . NETSUITE_TOKEN_ID
          . "&oauth_version=" . $oauth_version
          . "&realm=" . NETSUITE_ACCOUNT
          . "&script=" . NETSUITE_SCRIPT_ID
        );
    $sig_string = urlencode(NETSUITE_CONSUMER_SECRET) . '&' . urlencode(NETSUITE_TOKEN_SECRET);
    $signature = base64_encode(hash_hmac("sha1", $base_string, $sig_string, true));

    $auth_header = "OAuth "
        . 'oauth_signature="' . rawurlencode($signature) . '", '
        . 'oauth_version="' . rawurlencode($oauth_version) . '", '
        . 'oauth_nonce="' . rawurlencode($oauth_nonce) . '", '
        . 'oauth_signature_method="' . rawurlencode($oauth_signature_method) . '", '
        . 'oauth_consumer_key="' . rawurlencode(NETSUITE_CONSUMER_KEY) . '", '
        . 'oauth_token="' . rawurlencode(NETSUITE_TOKEN_ID) . '", '  
        . 'oauth_timestamp="' . rawurlencode($oauth_timestamp) . '", '
        . 'realm="' . rawurlencode(NETSUITE_ACCOUNT) .'"';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, NETSUITE_URL . '?&script=' . NETSUITE_SCRIPT_ID . '&deploy=' . NETSUITE_DEPLOY_ID . '&realm=' . NETSUITE_ACCOUNT);
    curl_setopt($ch, CURLOPT_POST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: ' . $auth_header,
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string)
    ]);

    $response = curl_exec($ch);
      $err = curl_error($ch);
      curl_close($ch);
      if ($err) {
          echo "<hr><br> Error !!" . $err;
          return "Error";
      } 
      return $response;
}
  ?>