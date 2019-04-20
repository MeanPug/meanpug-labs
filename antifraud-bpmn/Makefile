all:
	+$(MAKE) -C antifraud up	
	+$(MAKE) -C storefront up
	+$(MAKE) -C antifraud-worker up

down:
	+$(MAKE) -C storefront down
	+$(MAKE) -C antifraud-worker down
	+$(MAKE) -C antifraud down
	