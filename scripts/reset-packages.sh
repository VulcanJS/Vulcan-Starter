#!/bin/bash
# reset the packages file

# comment all the example files
sed -i '/^\s*example/s/^\s*/# /' .meteor/packages
# uncomment the getting started
sed -i '/^\s*#\+\s*getting-started/s/\s*#\+\s*//' .meteor/packages