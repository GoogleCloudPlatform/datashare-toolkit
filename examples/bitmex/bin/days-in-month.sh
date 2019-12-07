#!/bin/bash -e
#
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

if [ -z $(echo "${2}") ]; then
    echo "Usage: ${0} <MONTH> <YEAR>"
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

