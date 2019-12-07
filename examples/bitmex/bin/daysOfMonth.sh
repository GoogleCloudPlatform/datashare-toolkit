#!/bin/bash
#
# Usage: daysOfMonth.sh 1 2019

if [ -z ${2} ]; then
    echo "Usage: ./daysOfMonth.sh <MONTH> <YEAR>"
    exit 1
fi

if [ ${#1} == 1 ];
then
  MONTH="0${1}";
else
  MONTH=${1};
fi;
YEAR=${2}

for i in $(cal $1 $2 | grep -v $2 | grep -v Su | tr "\n" ' ' | tr -s " ") ;
do    
  if [ ${#i} == 1 ]; 
  then 
    DAY="0${i}";
    echo ${YEAR}${MONTH}${DAY}
  else  
    DAY=${i}; 
    echo ${YEAR}${MONTH}${DAY}
  fi  ; 
done

