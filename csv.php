<?php 
header('Content-Type: text/plain'); 
$csv = file_get_contents('data.csv'); 
echo $csv; 
?> 