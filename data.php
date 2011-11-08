<?php 
header('Content-Type: text/plain'); 
$csv = file_get_contents('csvwork.csv'); 
echo $csv; 
?> 