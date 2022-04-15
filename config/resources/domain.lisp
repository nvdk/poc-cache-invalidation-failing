(in-package :mu-cl-resources)

(defparameter *cache-count-queries* nil)
(defparameter *supply-cache-headers-p* t
  "when non-nil, cache headers are supplied.  this works together with mu-cache.")
;;(setf *cache-model-properties-p* t)
(defparameter *include-count-in-paginated-responses* t
  "when non-nil, all paginated listings will contain the number
   of responses in the result object's meta.")
(defparameter *max-group-sorted-properties* nil)
(setf sparql:*experimental-no-application-graph-for-sudo-select-queries* t)

(define-resource zitting ()
  :class (s-prefix "besluit:Zitting")
  :properties `((:geplande-start :datetime ,(s-prefix "besluit:geplandeStart"))
                (:gestart-op-tijdstip :datetime ,(s-prefix "prov:startedAtTime"))
                (:geeindigd-op-tijdstip :datetime ,(s-prefix "prov:endedAtTime"))
                (:op-locatie :string ,(s-prefix "prov:atLocation"))
                (:intro :string ,(s-prefix "notulen:intro"))
                (:outro :string ,(s-prefix "notulen:outro")))

  :has-one `((bestuursorgaan :via ,(s-prefix "besluit:isGehoudenDoor")
                             :as "bestuursorgaan"))
  :resource-base (s-url "http://data.lblod.info/id/zittingen/")
  :features '(include-uri)
  :on-path "zittingen")

(define-resource bestuursorgaan ()
  :class (s-prefix "besluit:Bestuursorgaan")
  :properties `((:naam :string ,(s-prefix "skos:prefLabel"))
                (:binding-einde :date ,(s-prefix "mandaat:bindingEinde"))
                (:binding-start :date ,(s-prefix "mandaat:bindingStart")))
  :has-one `((bestuurseenheid :via ,(s-prefix "besluit:bestuurt")
                              :as "bestuurseenheid")
             (bestuursorgaan-classificatie-code :via ,(s-prefix "besluit:classificatie")
                                                :as "classificatie")
             (bestuursorgaan :via ,(s-prefix "mandaat:isTijdspecialisatieVan")
                             :as "is-tijdsspecialisatie-van")
             (rechtstreekse-verkiezing :via ,(s-prefix "mandaat:steltSamen")
                                      :inverse t
                                      :as "wordt-samengesteld-door"))
  :has-many `((bestuursorgaan :via ,(s-prefix "mandaat:isTijdspecialisatieVan")
                       :inverse t
                       :as "heeft-tijdsspecialisaties")
              (mandaat :via ,(s-prefix "org:hasPost")
                       :as "bevat")
              (bestuursfunctie :via ,(s-prefix "lblodlg:heeftBestuursfunctie")
                               :as "bevat-bestuursfunctie"))
  :resource-base (s-url "http://data.lblod.info/id/bestuursorganen/")
  :features '(include-uri)
  :on-path "bestuursorganen")

(define-resource published-resource ()
  :class (s-prefix "sign:PublishedResource")
  :properties `((:body :string ,(s-prefix "sign:text"))
                (:hash-value :string ,(s-prefix "sign:hashValue"))
                (:created-on :datetime ,(s-prefix "dct:created"))
                (:submission-status :uri ,(s-prefix "ext:submissionStatus")))
  :resource-base (s-url "http://data.lblod.info/published-resources/")
  :features '(include-uri)
  :on-path "published-resources")

;; reading in the domain.json
(read-domain-file "domain.json")
